package com.omnicart.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    public static final String TOPIC_ORDERS_PLACED = "omnicart.orders.placed";
    public static final String TOPIC_INVENTORY_DEDUCTED = "omnicart.inventory.deducted";
    public static final String TOPIC_LICENSES_ISSUED = "omnicart.licenses.issued";
    public static final String TOPIC_CART_SYNC = "omnicart.cart.sync";

    @Bean
    public NewTopic ordersPlacedTopic() {
        return TopicBuilder.name(TOPIC_ORDERS_PLACED)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic inventoryDeductedTopic() {
        return TopicBuilder.name(TOPIC_INVENTORY_DEDUCTED)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic licensesIssuedTopic() {
        return TopicBuilder.name(TOPIC_LICENSES_ISSUED)
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic cartSyncTopic() {
        return TopicBuilder.name(TOPIC_CART_SYNC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}
