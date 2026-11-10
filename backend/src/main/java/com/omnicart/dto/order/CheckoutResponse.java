package com.omnicart.dto.order;

import com.omnicart.dto.payment.PaymentResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutResponse {

    private String orderId;
    private String status;
    private BigDecimal totalAmount;
    private String currency;
    private PaymentResponse paymentDetails;
    private String kafkaEventTopic;
    private String message;

    @Builder.Default
    private Instant timestamp = Instant.now();
}
