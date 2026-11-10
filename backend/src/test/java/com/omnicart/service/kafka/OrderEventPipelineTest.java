package com.omnicart.service.kafka;

import com.omnicart.dto.analytics.AnalyticsVelocityDTO;
import com.omnicart.event.OrderItemEventDTO;
import com.omnicart.event.OrderPlacedEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Kafka Order Streaming Pipeline Tests")
class OrderEventPipelineTest {

    private AnalyticsKafkaConsumer analyticsConsumer;

    @BeforeEach
    void setUp() {
        analyticsConsumer = new AnalyticsKafkaConsumer();
    }

    @Test
    @DisplayName("Should aggregate velocity metrics when OrderPlacedEvent arrives")
    void shouldAggregateVelocityMetrics() {
        OrderPlacedEvent event = OrderPlacedEvent.builder()
                .orderId("ORD-TEST-001")
                .userId("usr-dev-99")
                .userEmail("engineer@omnicart.io")
                .totalAmount(new BigDecimal("299.00"))
                .currency("USD")
                .placedAt(Instant.now())
                .items(List.of(
                        OrderItemEventDTO.builder()
                                .productId("prod-001")
                                .productName("CloudOps EKS Blueprint")
                                .quantity(2)
                                .unitPrice(new BigDecimal("149.50"))
                                .build()
                ))
                .build();

        analyticsConsumer.handleOrderTelemetry(event);

        AnalyticsVelocityDTO metrics = analyticsConsumer.getAnalyticsSummary();

        assertNotNull(metrics);
        assertEquals(1, metrics.getTotalOrdersCount());
        assertEquals(new BigDecimal("299.00"), metrics.getTotalGrossVolume());
        assertEquals(2, metrics.getTotalSeatsAllocated());
        assertTrue(metrics.getTopBlueprints().containsKey("CloudOps EKS Blueprint"));
        assertEquals(2, metrics.getTopBlueprints().get("CloudOps EKS Blueprint"));
        assertTrue(metrics.getOrdersPerMinute() >= 0.0);
    }

    @Test
    @DisplayName("Should handle multiple orders in rolling window")
    void shouldHandleMultipleOrdersInRollingWindow() {
        for (int i = 1; i <= 5; i++) {
            OrderPlacedEvent event = OrderPlacedEvent.builder()
                    .orderId("ORD-BATCH-" + i)
                    .userId("usr-" + i)
                    .userEmail("dev" + i + "@omnicart.io")
                    .totalAmount(new BigDecimal("100.00"))
                    .currency("USD")
                    .items(List.of(
                            OrderItemEventDTO.builder()
                                    .productId("prod-002")
                                    .productName("AgenticLLM Framework")
                                    .quantity(1)
                                    .unitPrice(new BigDecimal("100.00"))
                                    .build()
                    ))
                    .build();

            analyticsConsumer.handleOrderTelemetry(event);
        }

        AnalyticsVelocityDTO metrics = analyticsConsumer.getAnalyticsSummary();

        assertEquals(5, metrics.getTotalOrdersCount());
        assertEquals(new BigDecimal("500.00"), metrics.getTotalGrossVolume());
        assertEquals(5, metrics.getTotalSeatsAllocated());
        assertEquals(5, metrics.getTopBlueprints().get("AgenticLLM Framework"));
    }
}

