package com.omnicart.controller;

import com.omnicart.dto.ApiResponse;
import com.omnicart.dto.payment.CircuitBreakerStatusDTO;
import com.omnicart.dto.payment.PaymentRequest;
import com.omnicart.dto.payment.PaymentResponse;
import com.omnicart.service.PaymentGatewayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PaymentController {

    private final PaymentGatewayService paymentGatewayService;

    @PostMapping("/process")
    public ResponseEntity<ApiResponse<PaymentResponse>> processPayment(@Valid @RequestBody PaymentRequest request) {
        log.info("[REST] Incoming payment authorization request for Order: {}", request.getOrderId());
        PaymentResponse response = paymentGatewayService.processPayment(request);
        return ResponseEntity.ok(ApiResponse.success("Payment processed via Resilience4j pipeline", response));
    }

    @GetMapping("/circuit-status")
    public ResponseEntity<ApiResponse<CircuitBreakerStatusDTO>> getCircuitBreakerStatus() {
        CircuitBreakerStatusDTO status = paymentGatewayService.getCircuitBreakerStatus();
        return ResponseEntity.ok(ApiResponse.success("Live Resilience4j Circuit Breaker metrics", status));
    }
}

