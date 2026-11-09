package com.omnicart.controller;

import com.omnicart.dto.ApiResponse;
import com.omnicart.dto.ai.AiSearchRequest;
import com.omnicart.dto.ai.AiSearchResponse;
import com.omnicart.service.ai.AiSearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AiAssistantController {

    private final AiSearchService aiSearchService;

    @PostMapping("/search")
    public ResponseEntity<ApiResponse<AiSearchResponse>> search(@Valid @RequestBody AiSearchRequest request) {
        log.info("[REST-AI] Intent search query: '{}'", request.getQuery());
        AiSearchResponse response = aiSearchService.searchByIntent(request);
        return ResponseEntity.ok(ApiResponse.success("AI search completed with JSONB attribute matching", response));
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<AiSearchResponse>> chat(@RequestBody Map<String, Object> payload) {
        String prompt = (String) payload.getOrDefault("message", payload.getOrDefault("query", ""));
        log.info("[REST-AI-CHAT] Processing conversational prompt: '{}'", prompt);

        AiSearchRequest request = AiSearchRequest.builder()
                .query(prompt)
                .build();

        AiSearchResponse response = aiSearchService.searchByIntent(request);
        return ResponseEntity.ok(ApiResponse.success("AI shopping assistant response generated", response));
    }

    @GetMapping("/prompts")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> getSamplePrompts() {
        List<Map<String, String>> samples = List.of(
                Map.entry("label", "AWS EKS Terraform", "query", "Recommend production Terraform blueprints for AWS EKS under $200"),
                Map.entry("label", "Multi-Agent AI", "query", "Find autonomous multi-agent orchestration frameworks with Python"),
                Map.entry("label", "Kafka Event Streaming", "query", "High-throughput Kafka streaming architecture with Spring Boot"),
                Map.entry("label", "Zero-Trust Security", "query", "Zero-trust JWT authentication reverse proxy with Go")
        ).stream().map(e -> Map.of("label", e.getKey(), "query", e.getValue())).toList();

        return ResponseEntity.ok(ApiResponse.success("Sample engineering prompts", samples));
    }
}
