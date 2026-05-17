package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.OrderResponse;
import com.lugtu.petstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> checkout(Authentication authentication) {
        return ResponseEntity.ok(orderService.checkout(authentication.getName()));
    }
}