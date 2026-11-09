package com.omnicart.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CircuitBreakerStatusDTO {
    private String name;
    private String state;
    private float failureRate;
    private float slowCallRate;
    private int bufferedCalls;
    private int failedCalls;
    private int successfulCalls;
    private int slowCalls;
    private long notPermittedCalls;
}
