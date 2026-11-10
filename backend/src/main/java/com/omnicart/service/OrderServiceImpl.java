package com.omnicart.service;

import com.omnicart.config.KafkaTopicConfig;
import com.omnicart.dto.order.CheckoutRequest;
import com.omnicart.dto.order.CheckoutResponse;
import com.omnicart.dto.order.OrderDTO;
import com.omnicart.dto.payment.PaymentRequest;
import com.omnicart.dto.payment.PaymentResponse;
import com.omnicart.event.OrderItemEventDTO;
import com.omnicart.event.OrderPlacedEvent;
import com.omnicart.exception.ResourceNotFoundException;
import com.omnicart.model.OrderEntity;
import com.omnicart.model.OrderItemEntity;
import com.omnicart.model.ProductEntity;
import com.omnicart.repository.OrderRepository;
import com.omnicart.repository.ProductRepository;
import com.omnicart.service.kafka.OrderEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final PaymentGatewayService paymentGatewayService;
    private final OrderEventProducer orderEventProducer;

    @Override
    @Transactional
    public CheckoutResponse processCheckout(CheckoutRequest request) {
        String orderId = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        log.info("[CHECKOUT] Initializing checkout transaction {} for user {}", orderId, request.getUserEmail());

        // 1. Calculate settled totals and prepare line items
        BigDecimal subtotal = BigDecimal.ZERO;
        List<OrderItemEntity> orderItems = new ArrayList<>();
        List<OrderItemEventDTO> eventItems = new ArrayList<>();

        for (CheckoutRequest.CheckoutItemDTO itemDTO : request.getItems()) {
            BigDecimal price = itemDTO.getUnitPrice();
            String productName = itemDTO.getProductName();

            // Verify with catalog if price/name missing
            Optional<ProductEntity> productOpt = productRepository.findById(itemDTO.getProductId());
            if (productOpt.isPresent()) {
                ProductEntity product = productOpt.get();
                if (price == null) price = product.getPrice();
                if (productName == null) productName = product.getName();
            } else if (price == null) {
                price = new BigDecimal("99.00");
                productName = "Digital Engineering Blueprint";
            }

            int qty = itemDTO.getQuantity() != null && itemDTO.getQuantity() > 0 ? itemDTO.getQuantity() : 1;
            BigDecimal itemTotal = price.multiply(BigDecimal.valueOf(qty));
            subtotal = subtotal.add(itemTotal);

            String itemId = "ITEM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

            OrderItemEntity itemEntity = OrderItemEntity.builder()
                    .id(itemId)
                    .productId(itemDTO.getProductId())
                    .productName(productName)
                    .quantity(qty)
                    .unitPrice(price)
                    .licenseKeys(new ArrayList<>())
                    .createdAt(Instant.now())
                    .build();

            orderItems.add(itemEntity);

            eventItems.add(OrderItemEventDTO.builder()
                    .productId(itemDTO.getProductId())
                    .productName(productName)
                    .quantity(qty)
                    .unitPrice(price)
                    .build());
        }

        // 8% digital asset tax
        BigDecimal tax = subtotal.multiply(new BigDecimal("0.08")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = subtotal.add(tax).setScale(2, RoundingMode.HALF_UP);

        // 2. Settle payment via Resilience4j protected service
        PaymentRequest paymentRequest = PaymentRequest.builder()
                .orderId(orderId)
                .userEmail(request.getUserEmail())
                .amount(totalAmount)
                .currency("USD")
                .paymentMethod(request.getPaymentMethod())
                .simulationMode(request.getSimulationMode())
                .build();

        PaymentResponse paymentResponse = paymentGatewayService.processPayment(paymentRequest);

        String initialStatus = paymentResponse.isFallbackEngaged() ? "FALLBACK_RESERVED" : "PAID";

        // 3. Persist Order in PostgreSQL
        OrderEntity orderEntity = OrderEntity.builder()
                .id(orderId)
                .userId(request.getUserId())
                .userEmail(request.getUserEmail())
                .totalAmount(totalAmount)
                .currency("USD")
                .status(initialStatus)
                .metadata(Map.of(
                        "paymentTxnId", paymentResponse.getTransactionId(),
                        "paymentStatus", paymentResponse.getStatus().name(),
                        "circuitState", paymentResponse.getCircuitState(),
                        "fallbackEngaged", paymentResponse.isFallbackEngaged()
                ))
                .items(new ArrayList<>())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        for (OrderItemEntity item : orderItems) {
            item.setOrder(orderEntity);
            orderEntity.getItems().add(item);
        }

        orderRepository.save(orderEntity);
        log.info("[CHECKOUT] Order {} persisted in PostgreSQL with status {}", orderId, initialStatus);

        // 4. Asynchronously Broadcast OrderPlacedEvent to Apache Kafka
        OrderPlacedEvent kafkaEvent = OrderPlacedEvent.builder()
                .orderId(orderId)
                .userId(request.getUserId())
                .userEmail(request.getUserEmail())
                .totalAmount(totalAmount)
                .currency("USD")
                .items(eventItems)
                .placedAt(Instant.now())
                .metadata(orderEntity.getMetadata())
                .build();

        orderEventProducer.publishOrderPlaced(kafkaEvent);

        return CheckoutResponse.builder()
                .orderId(orderId)
                .status(initialStatus)
                .totalAmount(totalAmount)
                .currency("USD")
                .paymentDetails(paymentResponse)
                .kafkaEventTopic(KafkaTopicConfig.TOPIC_ORDERS_PLACED)
                .message("Order created and event broadcast to Apache Kafka for asynchronous seat deduction and license generation.")
                .timestamp(Instant.now())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .map(OrderDTO::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", orderId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
