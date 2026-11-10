package com.omnicart.service.kafka;

import com.omnicart.config.KafkaTopicConfig;
import com.omnicart.event.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishOrderPlaced(OrderPlacedEvent event) {
        String topic = KafkaTopicConfig.TOPIC_ORDERS_PLACED;
        String partitionKey = event.getOrderId();

        log.info("[KAFKA-PRODUCER] Publishing OrderPlacedEvent for Order ID: {} to topic: {}", partitionKey, topic);

        try {
            CompletableFuture<SendResult<String, Object>> future = kafkaTemplate.send(topic, partitionKey, event);

            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("[KAFKA-PRODUCER-SUCCESS] OrderPlacedEvent committed! Order: {}, Topic: {}, Partition: {}, Offset: {}",
                            event.getOrderId(),
                            result.getRecordMetadata().topic(),
                            result.getRecordMetadata().partition(),
                            result.getRecordMetadata().offset());
                } else {
                    log.error("[KAFKA-PRODUCER-ERROR] Failed to publish OrderPlacedEvent for Order: {}. Error: {}",
                            event.getOrderId(), ex.getMessage(), ex);
                }
            });
        } catch (Exception e) {
            log.error("[KAFKA-PRODUCER-EXCEPTION] Synchronous dispatch failure for Order: {}: {}", event.getOrderId(), e.getMessage());
        }
    }

    public void publishGenericEvent(String topic, String key, Object payload) {
        try {
            kafkaTemplate.send(topic, key, payload);
            log.debug("[KAFKA-PRODUCER] Dispatched event to topic: {} with key: {}", topic, key);
        } catch (Exception e) {
            log.error("[KAFKA-PRODUCER] Failed to dispatch to topic {}: {}", topic, e.getMessage());
        }
    }
}

