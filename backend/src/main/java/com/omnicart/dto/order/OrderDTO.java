package com.omnicart.dto.order;

import com.omnicart.model.OrderEntity;
import com.omnicart.model.OrderItemEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private String id;
    private String userId;
    private String userEmail;
    private BigDecimal totalAmount;
    private String currency;
    private String status;
    private Map<String, Object> metadata;

    @Builder.Default
    private List<OrderItemDTO> items = new ArrayList<>();

    private Instant createdAt;
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDTO {
        private String id;
        private String productId;
        private String productName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private List<String> licenseKeys;
    }

    public static OrderDTO fromEntity(OrderEntity entity) {
        if (entity == null) return null;

        List<OrderItemDTO> itemDTOs = entity.getItems() != null ?
                entity.getItems().stream()
                        .map(item -> OrderItemDTO.builder()
                                .id(item.getId())
                                .productId(item.getProductId())
                                .productName(item.getProductName())
                                .quantity(item.getQuantity())
                                .unitPrice(item.getUnitPrice())
                                .licenseKeys(item.getLicenseKeys())
                                .build())
                        .collect(Collectors.toList()) : new ArrayList<>();

        return OrderDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .userEmail(entity.getUserEmail())
                .totalAmount(entity.getTotalAmount())
                .currency(entity.getCurrency())
                .status(entity.getStatus())
                .metadata(entity.getMetadata())
                .items(itemDTOs)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
