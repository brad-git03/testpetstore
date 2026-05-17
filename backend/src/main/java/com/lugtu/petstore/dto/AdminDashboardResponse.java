package com.lugtu.petstore.dto;

public record AdminDashboardResponse(
        long users,
        long orders,
        long pets,
        long variants
) {}