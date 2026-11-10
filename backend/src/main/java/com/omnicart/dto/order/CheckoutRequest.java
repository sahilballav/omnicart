package com.omnicart.dto.order;

import com.omnicart.dto.payment.PaymentRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "User email is required")
    @Email(message = "Invalid email format")
    private String userEmail;

    @NotEmpty(message = "Order must contain at least one item")
    private List<CheckoutItemDTO> items;

    @Builder.Default
    private String paymentMethod = "DIGITAL_WALLET_STRIPE";

    @Builder.Default
    private PaymentRequest.SimulationMode simulationMode = PaymentRequest.SimulationMode.NORMAL;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CheckoutItemDTO {
        @NotBlank(message = "Product ID is mandatory")
        private String productId;

        private String productName;
        private Integer quantity;
        private BigDecimal unitPrice;
    }
}
