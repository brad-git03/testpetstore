package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.CartItemRequest;
import com.lugtu.petstore.dto.CartQuantityRequest;
import com.lugtu.petstore.dto.CartResponse;
import com.lugtu.petstore.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> get(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCart(authentication.getName()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> add(Authentication authentication, @Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addItem(authentication.getName(), request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> update(Authentication authentication, @PathVariable Long itemId, @Valid @RequestBody CartQuantityRequest request) {
        return ResponseEntity.ok(cartService.updateItem(authentication.getName(), itemId, request));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> remove(Authentication authentication, @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(authentication.getName(), itemId));
    }
}