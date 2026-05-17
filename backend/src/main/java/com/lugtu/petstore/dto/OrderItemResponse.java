package com.lugtu.petstore.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long petVariantId,
        String petName,
        String size,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal
) {}