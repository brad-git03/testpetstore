package com.lugtu.petstore.service;

import com.lugtu.petstore.dto.*;
import com.lugtu.petstore.entity.*;
import com.lugtu.petstore.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AdminService {
    @Autowired private UserRepository userRepository;
    @Autowired private PetRepository petRepository;
    @Autowired private PetVariantRepository petVariantRepository;
    @Autowired private OrderRepository orderRepository;

    public AdminDashboardResponse dashboard() {
        return new AdminDashboardResponse(userRepository.count(), orderRepository.count(), petRepository.count(), petVariantRepository.count());
    }

    public List<AdminPetResponse> pets() {
        return petRepository.findAll(PageRequest.of(0, 200)).stream().map(this::mapPet).toList();
    }

    @Transactional
    public AdminPetResponse createPet(AdminPetRequest request) {
        Pet pet = new Pet();
        applyPet(pet, request);
        return mapPet(petRepository.save(pet));
    }

    @Transactional
    public AdminPetResponse updatePet(Long id, AdminPetRequest request) {
        Pet pet = petRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));
        applyPet(pet, request);
        return mapPet(petRepository.save(pet));
    }

    @Transactional
    public void deletePet(Long id) {
        if (!petRepository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found");
        petRepository.deleteById(id);
    }

    public List<AdminVariantResponse> variants(Long petId) {
        return petVariantRepository.findByPetIdOrderBySortOrderAscIdAsc(petId).stream().map(this::mapVariant).toList();
    }

    @Transactional
    public AdminVariantResponse createVariant(Long petId, AdminVariantRequest request) {
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));
        PetVariant variant = new PetVariant();
        applyVariant(variant, pet, request);
        return mapVariant(petVariantRepository.save(variant));
    }

    @Transactional
    public AdminVariantResponse updateVariant(Long variantId, AdminVariantRequest request) {
        PetVariant variant = petVariantRepository.findById(variantId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
        applyVariant(variant, variant.getPet(), request);
        return mapVariant(petVariantRepository.save(variant));
    }

    @Transactional
    public void deleteVariant(Long variantId) {
        if (!petVariantRepository.existsById(variantId)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found");
        petVariantRepository.deleteById(variantId);
    }

    @Transactional
    public AdminVariantResponse updateStock(Long variantId, AdminStockRequest request) {
        PetVariant variant = petVariantRepository.findById(variantId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
        variant.setStockQuantity(request.stockQuantity());
        return mapVariant(petVariantRepository.save(variant));
    }

    @Transactional
    public List<AdminOrderResponse> orders() {
        return orderRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 200)).stream().map(this::mapOrder).toList();
    }

    @Transactional
    public AdminOrderResponse updateOrderStatus(Long orderId, AdminOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        try {
            order.setStatus(OrderStatus.valueOf(request.status().toUpperCase()));
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status");
        }
        return mapOrder(orderRepository.save(order));
    }

    private void applyPet(Pet pet, AdminPetRequest request) {
        pet.setName(request.name());
        pet.setCategory(request.category());
        pet.setBreed(request.breed());
        pet.setAge(request.age());
        pet.setGender(request.gender());
        pet.setPrice(request.price());
        pet.setPromoPrice(request.promoPrice());
        pet.setDescription(request.description());
        pet.setImageUrl(request.imageUrl());
        pet.setVaccinationStatus(request.vaccinationStatus());
        pet.setIsActive(request.active() == null || request.active());
        pet.setFeatured(request.featured() != null && request.featured());
        pet.setTrending(request.trending() != null && request.trending());
    }

    private void applyVariant(PetVariant variant, Pet pet, AdminVariantRequest request) {
        variant.setPet(pet);
        variant.setSize(request.size());
        variant.setBreedVariation(request.breedVariation());
        variant.setPrice(request.price());
        variant.setSalePrice(request.salePrice());
        variant.setStockQuantity(request.stockQuantity() == null ? 0 : request.stockQuantity());
        variant.setSku(request.sku());
        variant.setActive(request.active() == null || request.active());
        variant.setFeatured(request.featured() != null && request.featured());
        variant.setTrending(request.trending() != null && request.trending());
        variant.setSortOrder(request.sortOrder() == null ? 0 : request.sortOrder());
    }

    private AdminPetResponse mapPet(Pet pet) {
        return new AdminPetResponse(pet.getId(), pet.getName(), pet.getCategory(), pet.getBreed(), pet.getAge(), pet.getGender(), pet.getPrice(), pet.getPromoPrice(), pet.getDescription(), pet.getImageUrl(), pet.getVaccinationStatus(), pet.getIsActive(), pet.getFeatured(), pet.getTrending());
    }

    private AdminVariantResponse mapVariant(PetVariant variant) {
        return new AdminVariantResponse(variant.getId(), variant.getPet().getId(), variant.getSize(), variant.getBreedVariation(), variant.getPrice(), variant.getSalePrice(), variant.getStockQuantity(), variant.getSku(), variant.getActive(), variant.getFeatured(), variant.getTrending(), variant.getSortOrder());
    }

    private AdminOrderResponse mapOrder(Order order) {
        return new AdminOrderResponse(order.getId(), order.getUser().getEmail(), order.getStatus().name(), order.getTotal(), order.getCreatedAt());
    }
}