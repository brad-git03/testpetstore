package com.lugtu.petstore.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminOrderStatusRequest(
        @NotBlank String status
) {}