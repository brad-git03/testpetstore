package com.lugtu.petstore.dto;

public record PetImageDto(
        Long id,
        String imageUrl,
        String altText,
        Integer sortOrder,
        Boolean primaryImage
) {}