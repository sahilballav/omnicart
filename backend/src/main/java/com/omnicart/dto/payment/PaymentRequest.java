package com.omnicart.dto.payment;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {

    @NotBlank(message = "Order ID is mandatory")
    private String orderId;

    @NotBlank(message = "Customer email is mandatory")
    private String userEmail;

    @NotNull(message = "Amount is mandatory")
    @DecimalMin(value = "0.01", message = "Amount must be strictly greater than 0")
    private BigDecimal amount;

    @Builder.Default
    private String currency = "USD";

    @Builder.Default
    private String paymentMethod = "DIGITAL_WALLET_STRIPE";

    /**
     * Chaos testing mode:
     * - NORMAL: Standard payment processing
     * - SIMULATE_FAIL: Throws 503 remote gateway failure
     * - SIMULATE_TIMEOUT: Introduces 3.5s delay to trigger slow-call threshold
     */
    @Builder.Default
    private SimulationMode simulationMode = SimulationMode.NORMAL;

    public enum SimulationMode {
        NORMAL,
        SIMULATE_FAIL,
        SIMULATE_TIMEOUT
    }
}

