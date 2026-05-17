package com.lugtu.petstore.dto;

import jakarta.validation.constraints.Min;

public record AdminStockRequest(
        @Min(0) int stockQuantity
) {}