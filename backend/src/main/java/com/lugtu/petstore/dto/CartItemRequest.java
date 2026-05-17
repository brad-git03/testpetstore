package com.lugtu.petstore.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull Long petVariantId,
        @Min(1) int quantity
) {}