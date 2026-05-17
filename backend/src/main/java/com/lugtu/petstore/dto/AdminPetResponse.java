package com.lugtu.petstore.dto;

import java.math.BigDecimal;

public record AdminPetResponse(
        Long id,
        String name,
        String category,
        String breed,
        String age,
        String gender,
        BigDecimal price,
        Integer stockQuantity,
        BigDecimal promoPrice,
        String description,
        String imageUrl,
        String vaccinationStatus,
        Boolean active,
        Boolean featured,
        Boolean trending
) {}