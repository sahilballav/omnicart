package com.omnicart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    private String sessionId;

    @Builder.Default
    private List<CartItem> items = new ArrayList<>();

    @Builder.Default
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal estimatedTax = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;

    @Builder.Default
    private int totalQuantity = 0;

    @Builder.Default
    private Instant updatedAt = Instant.now();

    public void recalculateTotals() {
        if (items == null) {
            items = new ArrayList<>();
        }

        this.subtotal = items.stream()
                .map(CartItem::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        this.totalQuantity = items.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        // 8% tax calculation for digital architectural assets
        this.estimatedTax = this.subtotal.multiply(new BigDecimal("0.08"))
                .setScale(2, RoundingMode.HALF_UP);

        this.total = this.subtotal.add(this.estimatedTax)
                .setScale(2, RoundingMode.HALF_UP);

        this.updatedAt = Instant.now();
    }
}

