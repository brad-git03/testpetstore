package com.lugtu.petstore.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String status,
        BigDecimal subtotal,
        BigDecimal total,
        List<OrderItemResponse> items,
        Instant createdAt
) {}