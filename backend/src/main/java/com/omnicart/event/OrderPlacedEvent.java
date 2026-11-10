package com.omnicart.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderPlacedEvent {

    private String orderId;
    private String userId;
    private String userEmail;
    private BigDecimal totalAmount;
    private String currency;

    @Builder.Default
    private List<OrderItemEventDTO> items = new ArrayList<>();

    @Builder.Default
    private Instant placedAt = Instant.now();

    @Builder.Default
    private Map<String, Object> metadata = new HashMap<>();
}

