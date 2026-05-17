package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.WishlistItemResponse;
import com.lugtu.petstore.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishlistController {
    @Autowired private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistItemResponse>> list(Authentication authentication) {
        return ResponseEntity.ok(wishlistService.list(authentication.getName()));
    }

    @PostMapping("/{petId}")
    public ResponseEntity<List<WishlistItemResponse>> add(Authentication authentication, @PathVariable Long petId) {
        return ResponseEntity.ok(wishlistService.add(authentication.getName(), petId));
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<List<WishlistItemResponse>> remove(Authentication authentication, @PathVariable Long petId) {
        return ResponseEntity.ok(wishlistService.remove(authentication.getName(), petId));
    }
}