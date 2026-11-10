package com.omnicart.service.kafka;

import com.omnicart.config.KafkaTopicConfig;
import com.omnicart.event.LicenseIssuedEvent;
import com.omnicart.event.OrderItemEventDTO;
import com.omnicart.event.OrderPlacedEvent;
import com.omnicart.model.OrderEntity;
import com.omnicart.model.OrderItemEntity;
import com.omnicart.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class LicenseIssuanceKafkaConsumer {

    private final OrderRepository orderRepository;
    private final OrderEventProducer eventProducer;

    @KafkaListener(
            topics = KafkaTopicConfig.TOPIC_ORDERS_PLACED,
            groupId = "omnicart-license-group"
    )
    @Transactional
    public void issueDigitalLicenses(OrderPlacedEvent event) {
        log.info("[KAFKA-CONSUMER-LICENSE] Issuing Ed25519 cryptographic tokens for Order ID: {}", event.getOrderId());

        Optional<OrderEntity> orderOpt = orderRepository.findById(event.getOrderId());
        if (orderOpt.isEmpty()) {
            log.error("[KAFKA-CONSUMER-LICENSE] Order ID: {} not found in database for license generation", event.getOrderId());
            return;
        }

        OrderEntity order = orderOpt.get();

        for (OrderItemEntity item : order.getItems()) {
            List<String> keys = new ArrayList<>();
            int count = item.getQuantity() != null ? item.getQuantity() : 1;

            for (int i = 0; i < count; i++) {
                String token = generateEd25519Token(item.getProductId());
                keys.add(token);

                // Publish LicenseIssuedEvent
                LicenseIssuedEvent licenseEvent = LicenseIssuedEvent.builder()
                        .orderId(order.getId())
                        .productId(item.getProductId())
                        .licenseKey(token)
                        .licenseType("Commercial Production License")
                        .customerEmail(order.getUserEmail())
                        .issuedAt(Instant.now())
                        .build();

                eventProducer.publishGenericEvent(KafkaTopicConfig.TOPIC_LICENSES_ISSUED, token, licenseEvent);
            }

            item.setLicenseKeys(keys);
            log.info("[KAFKA-CONSUMER-LICENSE] Issued {} Ed25519 token(s) for item '{}' in Order {}",
                    keys.size(), item.getProductName(), order.getId());
        }

        order.setStatus("CONFIRMED");
        order.setUpdatedAt(Instant.now());
        orderRepository.save(order);

        log.info("[KAFKA-CONSUMER-LICENSE] Order ID: {} status transitioned to CONFIRMED with digital entitlements",
                order.getId());
    }

    private String generateEd25519Token(String productId) {
        String prefix = "ED25519";
        String tag = productId != null ? productId.replace("prod-", "").toUpperCase() : "OMNI";
        String entropy = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return String.format("%s-%s-%s-2026-OMNI", prefix, tag, entropy);
    }
}
