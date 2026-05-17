package com.lugtu.petstore.dto;

public record WishlistItemResponse(
        Long id,
        Long petId,
        String petName,
        String category,
        String imageUrl,
        Boolean featured,
        Boolean trending
) {}