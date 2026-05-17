package com.lugtu.petstore.dto;

import java.math.BigDecimal;

public record CartItemResponse(
        Long id,
        Long petVariantId,
        String petName,
        String size,
        String breedVariation,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal,
        Integer stockQuantity
) {}