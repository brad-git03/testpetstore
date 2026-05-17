package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.OrderResponse;
import com.lugtu.petstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> list(Authentication authentication) {
        return ResponseEntity.ok(orderService.list(authentication.getName()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> detail(Authentication authentication, @PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.detail(authentication.getName(), orderId));
    }
}