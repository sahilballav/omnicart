package com.omnicart.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LicenseIssuedEvent {
    private String orderId;
    private String productId;
    private String licenseKey;
    private String licenseType;
    private String customerEmail;

    @Builder.Default
    private Instant issuedAt = Instant.now();
}

