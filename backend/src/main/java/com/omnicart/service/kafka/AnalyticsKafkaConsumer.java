package com.omnicart.service.kafka;

import com.omnicart.config.KafkaTopicConfig;
import com.omnicart.dto.analytics.AnalyticsVelocityDTO;
import com.omnicart.event.OrderItemEventDTO;
import com.omnicart.event.OrderPlacedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Service
public class AnalyticsKafkaConsumer {

    private final AtomicLong totalOrdersCount = new AtomicLong(0);
    private final AtomicLong totalSeatsAllocated = new AtomicLong(0);
    private volatile BigDecimal totalGrossVolume = BigDecimal.ZERO;
    private volatile Instant lastEventReceived = Instant.now();

    private final ConcurrentLinkedDeque<Instant> recentOrderTimestamps = new ConcurrentLinkedDeque<>();
    private final ConcurrentHashMap<String, Integer> blueprintSalesCounts = new ConcurrentHashMap<>();

    @KafkaListener(
            topics = KafkaTopicConfig.TOPIC_ORDERS_PLACED,
            groupId = "omnicart-analytics-group"
    )
    public void handleOrderTelemetry(OrderPlacedEvent event) {
        log.info("[KAFKA-CONSUMER-ANALYTICS] Ingesting telemetry for Order: {}, Amount: {} {}",
                event.getOrderId(), event.getTotalAmount(), event.getCurrency());

        totalOrdersCount.incrementAndGet();
        lastEventReceived = Instant.now();
        recentOrderTimestamps.addLast(lastEventReceived);

        if (event.getTotalAmount() != null) {
            synchronized (this) {
                totalGrossVolume = totalGrossVolume.add(event.getTotalAmount());
            }
        }

        if (event.getItems() != null) {
            for (OrderItemEventDTO item : event.getItems()) {
                int quantity = item.getQuantity() != null ? item.getQuantity() : 1;
                totalSeatsAllocated.addAndGet(quantity);

                String name = item.getProductName() != null ? item.getProductName() : item.getProductId();
                blueprintSalesCounts.merge(name, quantity, Integer::sum);
            }
        }

        // Evict timestamps older than 5 minutes for rolling window
        Instant windowCutoff = Instant.now().minus(Duration.ofMinutes(5));
        while (!recentOrderTimestamps.isEmpty() && recentOrderTimestamps.peekFirst().isBefore(windowCutoff)) {
            recentOrderTimestamps.pollFirst();
        }
    }

    public AnalyticsVelocityDTO getAnalyticsSummary() {
        // Evict older entries
        Instant windowCutoff = Instant.now().minus(Duration.ofMinutes(5));
        while (!recentOrderTimestamps.isEmpty() && recentOrderTimestamps.peekFirst().isBefore(windowCutoff)) {
            recentOrderTimestamps.pollFirst();
        }

        double ordersInLast5Min = recentOrderTimestamps.size();
        double ordersPerMinute = Math.round((ordersInLast5Min / 5.0) * 100.0) / 100.0;

        return AnalyticsVelocityDTO.builder()
                .totalOrdersCount(totalOrdersCount.get())
                .totalGrossVolume(totalGrossVolume)
                .ordersPerMinute(ordersPerMinute)
                .totalSeatsAllocated((int) totalSeatsAllocated.get())
                .topBlueprints(Map.copyOf(blueprintSalesCounts))
                .lastEventReceived(lastEventReceived)
                .build();
    }
}
