package com.lugtu.petstore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AdminPetRequest(
        @NotBlank String name,
        @NotBlank String category,
        String breed,
        String age,
        String gender,
        @NotNull BigDecimal price,
        BigDecimal promoPrice,
        String description,
        String imageUrl,
        String vaccinationStatus,
        Boolean active,
        Boolean featured,
        Boolean trending
) {}