package com.lugtu.petstore.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record AdminOrderResponse(
        Long id,
        String customerEmail,
        String status,
        BigDecimal total,
        Instant createdAt
) {}