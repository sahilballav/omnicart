package com.omnicart.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsVelocityDTO {

    private long totalOrdersCount;
    private BigDecimal totalGrossVolume;
    private double ordersPerMinute;
    private int totalSeatsAllocated;
    private Map<String, Integer> topBlueprints;
    private Instant lastEventReceived;
}
