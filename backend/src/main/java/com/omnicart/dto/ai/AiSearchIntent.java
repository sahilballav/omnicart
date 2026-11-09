package com.omnicart.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiSearchIntent {

    private String rawQuery;
    private String detectedCategory;
    private BigDecimal maxBudget;
    private BigDecimal minBudget;
    private String targetCloud;
    private String iacFramework;
    private String runtime;
    private String architecturePattern;
    private List<String> extractedKeywords;
    private Map<String, String> jsonbAttributesFilter;
    private double confidenceScore;
}
