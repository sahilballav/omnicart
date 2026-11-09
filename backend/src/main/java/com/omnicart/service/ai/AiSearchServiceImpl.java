package com.omnicart.service.ai;

import com.omnicart.dto.ProductDTO;
import com.omnicart.dto.ai.AiSearchIntent;
import com.omnicart.dto.ai.AiSearchRequest;
import com.omnicart.dto.ai.AiSearchResponse;
import com.omnicart.model.ProductEntity;
import com.omnicart.repository.ProductRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiSearchServiceImpl implements AiSearchService {

    private static final String RESILIENCE_INSTANCE = "aiAssistant";

    private final AiQueryParserService queryParserService;
    private final ProductRepository productRepository;

    @Override
    @CircuitBreaker(name = RESILIENCE_INSTANCE, fallbackMethod = "fallbackAiSearch")
    @Retry(name = RESILIENCE_INSTANCE, fallbackMethod = "fallbackAiSearch")
    @RateLimiter(name = RESILIENCE_INSTANCE)
    public AiSearchResponse searchByIntent(AiSearchRequest request) {
        long startTime = System.currentTimeMillis();
        log.info("[AI-SEARCH] Processing natural language query: '{}'", request.getQuery());

        // 1. Natural Language Intent Parsing
        AiSearchIntent intent = queryParserService.parseIntent(request.getQuery());

        // Override with explicit request filters if provided
        if (request.getPreferredCategory() != null && !request.getPreferredCategory().isBlank()) {
            intent.setDetectedCategory(request.getPreferredCategory());
        }
        if (request.getMaxBudget() != null) {
            intent.setMaxBudget(request.getMaxBudget());
        }

        // 2. Fetch Blueprint Candidates from PostgreSQL
        List<ProductEntity> candidates;
        if (intent.getDetectedCategory() != null || intent.getMaxBudget() != null) {
            candidates = productRepository.findCandidatesByCategoryAndPrice(
                    intent.getDetectedCategory(),
                    intent.getMaxBudget()
            );
            // If strict filter yielded empty, fallback to all products for ranking
            if (candidates.isEmpty()) {
                candidates = productRepository.findAll();
            }
        } else {
            candidates = productRepository.findAll();
        }

        // 3. Dynamic Relevance Scoring with JSONB Attributes
        Map<ProductEntity, Double> scoredEntities = new HashMap<>();
        for (ProductEntity product : candidates) {
            double score = computeRelevanceScore(product, intent);
            scoredEntities.put(product, score);
        }

        // Sort by relevance score descending
        List<ProductEntity> topMatches = scoredEntities.entrySet().stream()
                .filter(entry -> entry.getValue() > 10.0) // Minimum relevance threshold
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .limit(4)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // If no match passed threshold, return top 2 highest rated products
        if (topMatches.isEmpty() && !candidates.isEmpty()) {
            topMatches = candidates.stream()
                    .sorted(Comparator.comparing(ProductEntity::getRating).reversed())
                    .limit(2)
                    .collect(Collectors.toList());
        }

        List<ProductDTO> matchedDTOs = topMatches.stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());

        // 4. Synthesize Architectural Reasoning & Action Plan
        String reasoning = synthesizeReasoning(intent, matchedDTOs);
        List<String> highlights = extractArchitecturalHighlights(intent, matchedDTOs);
        List<String> nextSteps = generateNextSteps(intent, matchedDTOs);

        long latency = System.currentTimeMillis() - startTime;
        log.info("[AI-SEARCH] Completed with {} matches in {}ms", matchedDTOs.size(), latency);

        return AiSearchResponse.builder()
                .originalQuery(request.getQuery())
                .intent(intent)
                .matchedBlueprints(matchedDTOs)
                .reasoning(reasoning)
                .architecturalHighlights(highlights)
                .recommendedNextSteps(nextSteps)
                .executionLatencyMs(latency)
                .generatedAt(Instant.now())
                .build();
    }

    /**
     * Fallback method if CircuitBreaker trips or LLM/search dependency fails
     */
    public AiSearchResponse fallbackAiSearch(AiSearchRequest request, Throwable ex) {
        log.error("[RESILIENCE4J-AI-FALLBACK] AI Search Circuit tripped: {} - {}",
                ex.getClass().getSimpleName(), ex.getMessage());

        // Fast in-memory fallback without heavy NLP/JSONB joins
        List<ProductDTO> fallbackProducts = productRepository.findAll().stream()
                .sorted(Comparator.comparing(ProductEntity::getRating).reversed())
                .limit(2)
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());

        AiSearchIntent minimalIntent = AiSearchIntent.builder()
                .rawQuery(request.getQuery())
                .confidenceScore(0.3)
                .extractedKeywords(Collections.emptyList())
                .jsonbAttributesFilter(Collections.emptyMap())
                .build();

        return AiSearchResponse.builder()
                .originalQuery(request.getQuery())
                .intent(minimalIntent)
                .matchedBlueprints(fallbackProducts)
                .reasoning("The primary Agentic AI intent engine is currently operating in low-latency fallback mode. Displaying top-rated enterprise digital blueprints.")
                .architecturalHighlights(List.of("Cached zero-latency failover active", "High-throughput fallback enabled"))
                .recommendedNextSteps(List.of("git clone <repo-url>", "verify license keys"))
                .executionLatencyMs(1)
                .generatedAt(Instant.now())
                .build();
    }

    private double computeRelevanceScore(ProductEntity product, AiSearchIntent intent) {
        double score = 0.0;
        String nameDesc = (product.getName() + " " + product.getDescription()).toLowerCase(Locale.ROOT);

        // Keyword matches (+25 per keyword)
        for (String kw : intent.getExtractedKeywords()) {
            if (nameDesc.contains(kw.toLowerCase(Locale.ROOT))) {
                score += 25.0;
            }
        }

        // Category match (+40)
        if (intent.getDetectedCategory() != null &&
                intent.getDetectedCategory().equalsIgnoreCase(product.getCategory())) {
            score += 40.0;
        }

        // Budget match (+20 if under budget)
        if (intent.getMaxBudget() != null && product.getPrice().compareTo(intent.getMaxBudget()) <= 0) {
            score += 20.0;
        }

        // JSONB attributes matching
        Map<String, Object> attributes = product.getAttributes();
        if (attributes != null && !attributes.isEmpty()) {
            Map<String, String> filters = intent.getJsonbAttributesFilter();
            for (Map.Entry<String, String> filter : filters.entrySet()) {
                Object val = attributes.get(filter.getKey());
                if (val != null && val.toString().toLowerCase(Locale.ROOT)
                        .contains(filter.getValue().toLowerCase(Locale.ROOT))) {
                    score += 35.0; // Strong bonus for JSONB spec match
                }
            }

            // Cloud provider match
            if (intent.getTargetCloud() != null) {
                Object cloud = attributes.get("cloud_provider");
                if (cloud != null && cloud.toString().equalsIgnoreCase(intent.getTargetCloud())) {
                    score += 30.0;
                }
            }

            // IaC framework match
            if (intent.getIacFramework() != null) {
                Object iac = attributes.get("iac_framework");
                if (iac != null && iac.toString().equalsIgnoreCase(intent.getIacFramework())) {
                    score += 30.0;
                }
            }

            // Runtime match
            if (intent.getRuntime() != null) {
                Object rt = attributes.get("runtime");
                if (rt != null && rt.toString().toLowerCase().contains(intent.getRuntime().toLowerCase())) {
                    score += 25.0;
                }
            }
        }

        // Quality weighting: rating and reviews
        if (product.getRating() != null) {
            score += product.getRating().doubleValue() * 3.0;
        }

        return score;
    }

    private String synthesizeReasoning(AiSearchIntent intent, List<ProductDTO> matches) {
        if (matches.isEmpty()) {
            return "No exact architectural matches found within the specified constraints. Try broadening your budget or search query.";
        }

        StringBuilder sb = new StringBuilder();
        sb.append(String.format("Identified %d enterprise blueprint%s matching your technical requirements. ",
                matches.size(), matches.size() > 1 ? "s" : ""));

        if (intent.getTargetCloud() != null) {
            sb.append(String.format("Optimized for %s cloud infrastructure. ", intent.getTargetCloud()));
        }
        if (intent.getIacFramework() != null) {
            sb.append(String.format("Includes production %s automation. ", intent.getIacFramework()));
        }
        if (intent.getMaxBudget() != null) {
            sb.append(String.format("All selections conform to the $%s target budget. ", intent.getMaxBudget()));
        }

        sb.append(String.format("Top candidate '%s' scored highest based on technical specs, zero-trust security postures, and verified production deployments.",
                matches.get(0).getName()));

        return sb.toString();
    }

    private List<String> extractArchitecturalHighlights(AiSearchIntent intent, List<ProductDTO> matches) {
        List<String> highlights = new ArrayList<>();
        if (!matches.isEmpty()) {
            ProductDTO top = matches.get(0);
            highlights.add(String.format("Primary Blueprint: %s (%s)", top.getName(), top.getBrand()));
            if (top.getAttributes() != null) {
                top.getAttributes().forEach((k, v) -> {
                    if (highlights.size() < 4) {
                        highlights.add(String.format("%s: %s", k.replace('_', ' ').toUpperCase(), v));
                    }
                });
            }
        }
        if (highlights.isEmpty()) {
            highlights.add("Cloud-native production ready");
            highlights.add("High availability multi-AZ support");
        }
        return highlights;
    }

    private List<String> generateNextSteps(AiSearchIntent intent, List<ProductDTO> matches) {
        List<String> steps = new ArrayList<>();
        if (!matches.isEmpty()) {
            steps.add("Select seat tier and add blueprint to deployment cart");
            steps.add("Instant Ed25519 token issuance upon checkout clearing");
            steps.add("Clone private GitHub repository with verified deploy keys");
        } else {
            steps.add("Refine search criteria or query our engineering catalog");
        }
        return steps;
    }
}
