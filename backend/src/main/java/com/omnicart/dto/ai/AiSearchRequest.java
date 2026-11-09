package com.omnicart.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiSearchRequest {

    @NotBlank(message = "Search query must not be blank")
    private String query;

    private String preferredCategory;
    private BigDecimal maxBudget;
    private List<String> previousContext;
}
