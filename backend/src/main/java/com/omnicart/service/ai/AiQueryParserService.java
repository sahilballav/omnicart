package com.omnicart.service.ai;

import com.omnicart.dto.ai.AiSearchIntent;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class AiQueryParserService {

    private static final Pattern PRICE_UNDER_PATTERN = Pattern.compile(
            "(?:under|below|less than|up to|budget|max|cheaper than)\\s*\\$?([0-9]+(?:\\.[0-9]{2})?)",
            Pattern.CASE_INSENSITIVE
    );

    private static final Pattern PRICE_OVER_PATTERN = Pattern.compile(
            "(?:above|over|more than|at least|min)\\s*\\$?([0-9]+(?:\\.[0-9]{2})?)",
            Pattern.CASE_INSENSITIVE
    );

    private static final Set<String> STOP_WORDS = Set.of(
            "the", "a", "an", "and", "or", "for", "with", "in", "on", "at", "to", "from",
            "is", "are", "find", "show", "give", "me", "get", "search", "looking", "want",
            "need", "recommend", "best", "some", "any", "blueprint", "blueprints", "template"
    );

    public AiSearchIntent parseIntent(String rawQuery) {
        if (rawQuery == null || rawQuery.trim().isEmpty()) {
            return AiSearchIntent.builder()
                    .rawQuery("")
                    .confidenceScore(0.0)
                    .extractedKeywords(Collections.emptyList())
                    .jsonbAttributesFilter(Collections.emptyMap())
                    .build();
        }

        String lowerQuery = rawQuery.toLowerCase(Locale.ROOT);
        Map<String, String> jsonbFilters = new LinkedHashMap<>();

        // 1. Budget extraction
        BigDecimal maxBudget = null;
        BigDecimal minBudget = null;

        Matcher maxMatcher = PRICE_UNDER_PATTERN.matcher(lowerQuery);
        if (maxMatcher.find()) {
            maxBudget = new BigDecimal(maxMatcher.group(1));
        }

        Matcher minMatcher = PRICE_OVER_PATTERN.matcher(lowerQuery);
        if (minMatcher.find()) {
            minBudget = new BigDecimal(minMatcher.group(1));
        }

        // 2. Category Detection
        String detectedCategory = null;
        if (containsAny(lowerQuery, "cloud", "devops", "kubernetes", "eks", "cluster", "terraform", "infrastructure", "vpc")) {
            detectedCategory = "CLOUD_DEVOPS";
        } else if (containsAny(lowerQuery, "ai", "agent", "llm", "neural", "rag", "vector", "autonomous", "gpt", "embedding")) {
            detectedCategory = "AI_AGENT_KITS";
        } else if (containsAny(lowerQuery, "microservice", "microservices", "kafka", "stream", "event", "spring boot", "telemetry", "tracing")) {
            detectedCategory = "MICROSERVICES_APIS";
        } else if (containsAny(lowerQuery, "ui", "figma", "tailwind", "design system", "component", "frontend", "saas ui")) {
            detectedCategory = "UI_SYSTEMS_FIGMA";
        } else if (containsAny(lowerQuery, "security", "jwt", "oauth", "zerotrust", "auth", "credential", "proxy")) {
            detectedCategory = "DEVELOPER_TOOLS";
        } else if (containsAny(lowerQuery, "course", "masterclass", "tutorial", "learn", "video")) {
            detectedCategory = "COURSES_MASTERCLASSES";
        }

        // 3. Cloud Provider Detection
        String targetCloud = null;
        if (lowerQuery.contains("aws") || lowerQuery.contains("eks") || lowerQuery.contains("amazon")) {
            targetCloud = "AWS";
            jsonbFilters.put("cloud_provider", "AWS");
        } else if (lowerQuery.contains("gcp") || lowerQuery.contains("google cloud") || lowerQuery.contains("gke")) {
            targetCloud = "GCP";
            jsonbFilters.put("cloud_provider", "GCP");
        } else if (lowerQuery.contains("multi-cloud") || lowerQuery.contains("multicloud") || lowerQuery.contains("hybrid")) {
            targetCloud = "Multi-Cloud";
            jsonbFilters.put("cloud_provider", "Multi-Cloud");
        }

        // 4. IaC Framework Detection
        String iacFramework = null;
        if (lowerQuery.contains("terraform") || lowerQuery.contains("opentofu")) {
            iacFramework = "Terraform";
            jsonbFilters.put("iac_framework", "Terraform");
        } else if (lowerQuery.contains("helm")) {
            iacFramework = "Helm";
            jsonbFilters.put("iac_framework", "Helm");
        }

        // 5. Runtime Detection
        String runtime = null;
        if (lowerQuery.contains("java") || lowerQuery.contains("spring")) {
            runtime = "Java 21";
            jsonbFilters.put("runtime", "Java 21");
        } else if (lowerQuery.contains("python")) {
            runtime = "Python 3.11";
            jsonbFilters.put("runtime", "Python 3.11");
        } else if (lowerQuery.contains("typescript") || lowerQuery.contains("react") || lowerQuery.contains("node")) {
            runtime = "TypeScript 5.x";
            jsonbFilters.put("runtime", "TypeScript 5.x");
        } else if (lowerQuery.contains("go") || lowerQuery.contains("golang")) {
            runtime = "Go 1.22";
            jsonbFilters.put("runtime", "Go 1.22");
        }

        // 6. Architecture Pattern Detection
        String pattern = null;
        if (lowerQuery.contains("event-driven") || lowerQuery.contains("kafka") || lowerQuery.contains("streaming")) {
            pattern = "Event-Driven";
        } else if (lowerQuery.contains("multi-agent") || lowerQuery.contains("orchestration")) {
            pattern = "Hierarchical Multi-Agent Graph";
        } else if (lowerQuery.contains("zero-trust") || lowerQuery.contains("jwt")) {
            pattern = "Zero-Trust Architecture";
        }

        // 7. Tokenized Keywords Extraction
        List<String> keywords = Arrays.stream(lowerQuery.replaceAll("[^a-zA-Z0-9\\s]", " ").split("\\s+"))
                .map(String::trim)
                .filter(w -> w.length() > 2 && !STOP_WORDS.contains(w))
                .distinct()
                .collect(Collectors.toList());

        // Confidence score calculation
        double score = 0.5;
        if (detectedCategory != null) score += 0.2;
        if (maxBudget != null) score += 0.1;
        if (targetCloud != null) score += 0.1;
        if (iacFramework != null || runtime != null) score += 0.1;

        return AiSearchIntent.builder()
                .rawQuery(rawQuery)
                .detectedCategory(detectedCategory)
                .maxBudget(maxBudget)
                .minBudget(minBudget)
                .targetCloud(targetCloud)
                .iacFramework(iacFramework)
                .runtime(runtime)
                .architecturePattern(pattern)
                .extractedKeywords(keywords)
                .jsonbAttributesFilter(jsonbFilters)
                .confidenceScore(Math.min(1.0, score))
                .build();
    }

    private boolean containsAny(String text, String... candidates) {
        for (String c : candidates) {
            if (text.contains(c)) return true;
        }
        return false;
    }
}
