package com.lugtu.petstore.dto;

import java.math.BigDecimal;

public record PetVariantDto(
        Long id,
        String size,
        String breedVariation,
        BigDecimal price,
        BigDecimal salePrice,
        Integer stockQuantity,
        Boolean active,
        Boolean featured,
        Boolean trending,
        Integer sortOrder
) {}