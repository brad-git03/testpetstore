package com.lugtu.petstore.dto;

public record AuthResponse(
        String accessToken,
        String role,
        String email,
        String fullName
) {}