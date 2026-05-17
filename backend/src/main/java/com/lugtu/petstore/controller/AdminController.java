package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.*;
import com.lugtu.petstore.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @Autowired private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> dashboard() {
        return ResponseEntity.ok(adminService.dashboard());
    }

    @GetMapping("/pets")
    public ResponseEntity<List<AdminPetResponse>> pets() {
        return ResponseEntity.ok(adminService.pets());
    }

    @PostMapping("/pets")
    public ResponseEntity<AdminPetResponse> createPet(@Valid @RequestBody AdminPetRequest request) {
        return ResponseEntity.ok(adminService.createPet(request));
    }

    @PutMapping("/pets/{petId}")
    public ResponseEntity<AdminPetResponse> updatePet(@PathVariable Long petId, @Valid @RequestBody AdminPetRequest request) {
        return ResponseEntity.ok(adminService.updatePet(petId, request));
    }

    @DeleteMapping("/pets/{petId}")
    public ResponseEntity<Void> deletePet(@PathVariable Long petId) {
        adminService.deletePet(petId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pets/{petId}/variants")
    public ResponseEntity<List<AdminVariantResponse>> variants(@PathVariable Long petId) {
        return ResponseEntity.ok(adminService.variants(petId));
    }

    @PostMapping("/pets/{petId}/variants")
    public ResponseEntity<AdminVariantResponse> createVariant(@PathVariable Long petId, @Valid @RequestBody AdminVariantRequest request) {
        return ResponseEntity.ok(adminService.createVariant(petId, request));
    }

    @PutMapping("/variants/{variantId}")
    public ResponseEntity<AdminVariantResponse> updateVariant(@PathVariable Long variantId, @Valid @RequestBody AdminVariantRequest request) {
        return ResponseEntity.ok(adminService.updateVariant(variantId, request));
    }

    @DeleteMapping("/variants/{variantId}")
    public ResponseEntity<Void> deleteVariant(@PathVariable Long variantId) {
        adminService.deleteVariant(variantId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/variants/{variantId}/stock")
    public ResponseEntity<AdminVariantResponse> updateStock(@PathVariable Long variantId, @Valid @RequestBody AdminStockRequest request) {
        return ResponseEntity.ok(adminService.updateStock(variantId, request));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<AdminOrderResponse>> orders() {
        return ResponseEntity.ok(adminService.orders());
    }

    @PatchMapping("/orders/{orderId}/status")
    public ResponseEntity<AdminOrderResponse> updateOrderStatus(@PathVariable Long orderId, @Valid @RequestBody AdminOrderStatusRequest request) {
        return ResponseEntity.ok(adminService.updateOrderStatus(orderId, request));
    }
}