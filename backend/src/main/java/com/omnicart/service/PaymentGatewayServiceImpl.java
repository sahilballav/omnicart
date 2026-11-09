package com.omnicart.service;

import com.omnicart.dto.payment.CircuitBreakerStatusDTO;
import com.omnicart.dto.payment.PaymentRequest;
import com.omnicart.dto.payment.PaymentResponse;
import com.omnicart.exception.PaymentGatewayException;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.ratelimiter.RequestNotPermitted;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentGatewayServiceImpl implements PaymentGatewayService {

    private static final String RESILIENCE_INSTANCE = "paymentGateway";
    private final CircuitBreakerRegistry circuitBreakerRegistry;

    @Override
    @io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker(name = RESILIENCE_INSTANCE, fallbackMethod = "fallbackPayment")
    @Retry(name = RESILIENCE_INSTANCE, fallbackMethod = "fallbackPayment")
    @RateLimiter(name = RESILIENCE_INSTANCE, fallbackMethod = "fallbackRateLimiter")
    public PaymentResponse processPayment(PaymentRequest request) {
        long startTime = System.currentTimeMillis();
        log.info("[PAYMENT-GATEWAY] Executing settlement for Order: {}, Amount: {} {}, Mode: {}",
                request.getOrderId(), request.getAmount(), request.getCurrency(), request.getSimulationMode());

        // Chaos engineering simulation modes
        if (request.getSimulationMode() == PaymentRequest.SimulationMode.SIMULATE_FAIL) {
            log.warn("[PAYMENT-GATEWAY-CHAOS] Simulating HTTP 503 downstream banking gateway failure for Order: {}",
                    request.getOrderId());
            throw new PaymentGatewayException("Simulated HTTP 503 Service Unavailable: Remote banking gateway timeout");
        }

        if (request.getSimulationMode() == PaymentRequest.SimulationMode.SIMULATE_TIMEOUT) {
            log.warn("[PAYMENT-GATEWAY-CHAOS] Simulating 3500ms latency spike (exceeding 2000ms slow call threshold)...");
            try {
                Thread.sleep(3500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new PaymentGatewayException("Payment gateway execution interrupted", e);
            }
        }

        long latency = System.currentTimeMillis() - startTime;
        String transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String circuitState = getCircuitState();

        log.info("[PAYMENT-GATEWAY] Settlement successful! TxnId: {}, Latency: {}ms, CircuitState: {}",
                transactionId, latency, circuitState);

        return PaymentResponse.builder()
                .transactionId(transactionId)
                .orderId(request.getOrderId())
                .status(PaymentResponse.PaymentStatus.SUCCESS)
                .message("Payment authorization cleared via primary digital clearinghouse")
                .gatewayLatencyMs(latency)
                .circuitState(circuitState)
                .fallbackEngaged(false)
                .timestamp(Instant.now())
                .build();
    }

    /**
     * Resilience4j Fallback method for CircuitBreaker and Retry exhaust
     */
    public PaymentResponse fallbackPayment(PaymentRequest request, Throwable ex) {
        log.error("[RESILIENCE4J-CIRCUIT-FALLBACK] Circuit Breaker engaged for Order: {}. Reason: {} - {}",
                request.getOrderId(), ex.getClass().getSimpleName(), ex.getMessage());

        String reservationId = "RES-FALLBACK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String circuitState = getCircuitState();

        return PaymentResponse.builder()
                .transactionId(reservationId)
                .orderId(request.getOrderId())
                .status(PaymentResponse.PaymentStatus.CIRCUIT_FALLBACK_RESERVATION)
                .message(String.format("Downstream payment gateway unreachable (%s). Order queued in asynchronous resilient ledger for guaranteed clearing.",
                        ex.getClass().getSimpleName()))
                .gatewayLatencyMs(0)
                .circuitState(circuitState)
                .fallbackEngaged(true)
                .timestamp(Instant.now())
                .build();
    }

    /**
     * Resilience4j Fallback method for RateLimiter rejection
     */
    public PaymentResponse fallbackRateLimiter(PaymentRequest request, RequestNotPermitted ex) {
        log.warn("[RESILIENCE4J-RATELIMIT-FALLBACK] Rate limit exceeded for Order: {}. Deferring request.",
                request.getOrderId());

        return PaymentResponse.builder()
                .transactionId("RATE-LIMITED-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .orderId(request.getOrderId())
                .status(PaymentResponse.PaymentStatus.RATE_LIMITED_DEFERRED)
                .message("High concurrent transaction volume. Transaction rate-limited and throttled gracefully.")
                .gatewayLatencyMs(0)
                .circuitState(getCircuitState())
                .fallbackEngaged(true)
                .timestamp(Instant.now())
                .build();
    }

    @Override
    public CircuitBreakerStatusDTO getCircuitBreakerStatus() {
        CircuitBreaker cb = circuitBreakerRegistry.circuitBreaker(RESILIENCE_INSTANCE);
        CircuitBreaker.Metrics metrics = cb.getMetrics();

        return CircuitBreakerStatusDTO.builder()
                .name(cb.getName())
                .state(cb.getState().name())
                .failureRate(metrics.getFailureRate())
                .slowCallRate(metrics.getSlowCallRate())
                .bufferedCalls(metrics.getNumberOfBufferedCalls())
                .failedCalls(metrics.getNumberOfFailedCalls())
                .successfulCalls(metrics.getNumberOfSuccessfulCalls())
                .slowCalls(metrics.getNumberOfSlowCalls())
                .notPermittedCalls(metrics.getNumberOfNotPermittedCalls())
                .build();
    }

    private String getCircuitState() {
        try {
            return circuitBreakerRegistry.circuitBreaker(RESILIENCE_INSTANCE).getState().name();
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }
}

