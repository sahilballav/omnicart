package com.omnicart.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private String id;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Product description is required")
    private String description;

    @NotNull(message = "Product price is required")
    @DecimalMin(value = "0.00", message = "Price cannot be negative")
    private BigDecimal price;

    @NotBlank(message = "Product category is required")
    private String category;

    @NotBlank(message = "Product brand is required")
    private String brand;

    @Builder.Default
    private BigDecimal rating = new BigDecimal("5.00");

    @Builder.Default
    private Integer reviewCount = 0;

    @NotNull(message = "Inventory count is required")
    @Min(value = 0, message = "Inventory count cannot be negative")
    @Builder.Default
    private Integer inventoryCount = 100;

    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Builder.Default
    private Map<String, Object> attributes = new HashMap<>();

    private Instant createdAt;
    private Instant updatedAt;
}

