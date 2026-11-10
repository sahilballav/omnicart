package com.omnicart.service.kafka;

import com.omnicart.config.KafkaTopicConfig;
import com.omnicart.event.InventoryDeductedEvent;
import com.omnicart.event.OrderItemEventDTO;
import com.omnicart.event.OrderPlacedEvent;
import com.omnicart.model.ProductEntity;
import com.omnicart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryKafkaConsumer {

    private final ProductRepository productRepository;
    private final OrderEventProducer eventProducer;

    @KafkaListener(
            topics = KafkaTopicConfig.TOPIC_ORDERS_PLACED,
            groupId = "omnicart-inventory-group"
    )
    @Transactional
    public void handleOrderPlaced(OrderPlacedEvent event) {
        log.info("[KAFKA-CONSUMER-INVENTORY] Processing inventory decrement for Order ID: {}", event.getOrderId());

        if (event.getItems() == null || event.getItems().isEmpty()) {
            log.warn("[KAFKA-CONSUMER-INVENTORY] Order ID: {} has no items to deduct", event.getOrderId());
            return;
        }

        for (OrderItemEventDTO item : event.getItems()) {
            Optional<ProductEntity> productOpt = productRepository.findById(item.getProductId());
            if (productOpt.isPresent()) {
                ProductEntity product = productOpt.get();
                int currentInventory = product.getInventoryCount() != null ? product.getInventoryCount() : 100;
                int quantity = item.getQuantity() != null ? item.getQuantity() : 1;
                int updatedInventory = Math.max(0, currentInventory - quantity);

                product.setInventoryCount(updatedInventory);
                productRepository.save(product);

                log.info("[KAFKA-CONSUMER-INVENTORY] Blueprint '{}' (ID: {}) inventory decremented: {} -> {}",
                        product.getName(), product.getId(), currentInventory, updatedInventory);

                if (updatedInventory <= 5) {
                    log.warn("[INVENTORY-LOW-STOCK-ALERT] Blueprint '{}' is running low: only {} seats remaining!",
                            product.getName(), updatedInventory);
                }

                // Broadcast inventory deducted event
                InventoryDeductedEvent deductedEvent = InventoryDeductedEvent.builder()
                        .orderId(event.getOrderId())
                        .productId(product.getId())
                        .quantityDeducted(quantity)
                        .remainingInventory(updatedInventory)
                        .timestamp(Instant.now())
                        .build();

                eventProducer.publishGenericEvent(KafkaTopicConfig.TOPIC_INVENTORY_DEDUCTED, product.getId(), deductedEvent);
            } else {
                log.error("[KAFKA-CONSUMER-INVENTORY] Product ID: {} not found in catalog for Order: {}",
                        item.getProductId(), event.getOrderId());
            }
        }
    }
}
