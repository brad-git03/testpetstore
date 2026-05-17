package com.lugtu.petstore.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AdminVariantRequest(
        @NotBlank String size,
        String breedVariation,
        @NotNull BigDecimal price,
        BigDecimal salePrice,
        @Min(0) Integer stockQuantity,
        String sku,
        Boolean active,
        Boolean featured,
        Boolean trending,
        Integer sortOrder
) {}