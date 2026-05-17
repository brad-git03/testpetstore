package com.lugtu.petstore.dto;

public record MeResponse(
        Long id,
        String email,
        String role,
        String fullName
) {}