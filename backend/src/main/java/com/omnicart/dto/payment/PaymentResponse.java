package com.omnicart.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private String transactionId;
    private String orderId;
    private PaymentStatus status;
    private String message;
    private long gatewayLatencyMs;
    private String circuitState;
    private boolean fallbackEngaged;

    @Builder.Default
    private Instant timestamp = Instant.now();

    public enum PaymentStatus {
        SUCCESS,
        CIRCUIT_FALLBACK_RESERVATION,
        RATE_LIMITED_DEFERRED,
        FAILED
    }
}
