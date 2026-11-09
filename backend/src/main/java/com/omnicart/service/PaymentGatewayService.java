package com.omnicart.service;

import com.omnicart.dto.payment.CircuitBreakerStatusDTO;
import com.omnicart.dto.payment.PaymentRequest;
import com.omnicart.dto.payment.PaymentResponse;

public interface PaymentGatewayService {

    PaymentResponse processPayment(PaymentRequest request);

    CircuitBreakerStatusDTO getCircuitBreakerStatus();
}
