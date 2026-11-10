package com.omnicart.controller;

import com.omnicart.dto.ApiResponse;
import com.omnicart.dto.analytics.AnalyticsVelocityDTO;
import com.omnicart.dto.order.CheckoutRequest;
import com.omnicart.dto.order.CheckoutResponse;
import com.omnicart.dto.order.OrderDTO;
import com.omnicart.service.OrderService;
import com.omnicart.service.kafka.AnalyticsKafkaConsumer;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class OrderController {

    private final OrderService orderService;
    private final AnalyticsKafkaConsumer analyticsConsumer;

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<CheckoutResponse>> checkout(@Valid @RequestBody CheckoutRequest request) {
        log.info("[REST-ORDER] Checkout initiated by: {}", request.getUserEmail());
        CheckoutResponse response = orderService.processCheckout(request);
        return ResponseEntity.ok(ApiResponse.success("Order checkout initiated and published to Apache Kafka", response));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDTO>> getOrderById(@PathVariable String orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(ApiResponse.success("Order retrieved successfully", order));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getOrdersByUserId(@PathVariable String userId) {
        List<OrderDTO> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("User orders retrieved successfully", orders));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("All platform orders retrieved", orders));
    }

    @GetMapping("/analytics/velocity")
    public ResponseEntity<ApiResponse<AnalyticsVelocityDTO>> getAnalyticsVelocity() {
        AnalyticsVelocityDTO metrics = analyticsConsumer.getAnalyticsSummary();
        return ResponseEntity.ok(ApiResponse.success("Real-time Kafka purchasing velocity metrics", metrics));
    }
}
