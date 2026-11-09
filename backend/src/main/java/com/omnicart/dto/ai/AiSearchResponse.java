package com.omnicart.dto.ai;

import com.omnicart.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiSearchResponse {

    private String originalQuery;
    private AiSearchIntent intent;
    private List<ProductDTO> matchedBlueprints;
    private String reasoning;
    private List<String> architecturalHighlights;
    private List<String> recommendedNextSteps;
    private long executionLatencyMs;

    @Builder.Default
    private Instant generatedAt = Instant.now();
}
