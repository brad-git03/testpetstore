package com.lugtu.petstore.dto;

import java.math.BigDecimal;

public record AdminVariantResponse(
        Long id,
        Long petId,
        String size,
        String breedVariation,
        BigDecimal price,
        BigDecimal salePrice,
        Integer stockQuantity,
        String sku,
        Boolean active,
        Boolean featured,
        Boolean trending,
        Integer sortOrder
) {}