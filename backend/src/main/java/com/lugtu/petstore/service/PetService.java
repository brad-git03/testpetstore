package com.lugtu.petstore.service;

import com.lugtu.petstore.entity.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class PetService {
    @Autowired
    private PetCatalogService petCatalogService;

    public Page<Pet> list(String category, String q, int page, int size) {
        return petCatalogService.list(category, q, page, size);
    }

    public Pet findById(Long id) {
        return petCatalogService.findById(id);
    }

    public java.util.List<com.lugtu.petstore.dto.PetImageDto> images(Long petId) {
        return petCatalogService.images(petId);
    }

    public java.util.List<com.lugtu.petstore.dto.PetVariantDto> variants(Long petId) {
        return petCatalogService.variants(petId);
    }
}
