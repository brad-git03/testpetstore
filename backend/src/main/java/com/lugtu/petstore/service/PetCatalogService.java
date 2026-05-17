package com.lugtu.petstore.service;

import com.lugtu.petstore.dto.PetImageDto;
import com.lugtu.petstore.dto.PetVariantDto;
import com.lugtu.petstore.entity.Pet;
import com.lugtu.petstore.entity.PetImage;
import com.lugtu.petstore.entity.PetVariant;
import com.lugtu.petstore.repository.PetImageRepository;
import com.lugtu.petstore.repository.PetRepository;
import com.lugtu.petstore.repository.PetVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetCatalogService {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PetImageRepository petImageRepository;

    @Autowired
    private PetVariantRepository petVariantRepository;

    public Page<Pet> list(String category, String q, int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        if (q != null && !q.isEmpty()) return petRepository.search(q, pr);
        if (category != null && !category.isEmpty()) return petRepository.findByCategoryIgnoreCaseAndIsActiveTrue(category, pr);
        return petRepository.findAll(pr);
    }

    public Pet findById(Long id) {
        return petRepository.findById(id).orElse(null);
    }

    public List<PetImageDto> images(Long petId) {
        return petImageRepository.findByPetIdOrderBySortOrderAscIdAsc(petId).stream().map(this::mapImage).toList();
    }

    public List<PetVariantDto> variants(Long petId) {
        return petVariantRepository.findByPetIdAndActiveTrueOrderBySortOrderAscIdAsc(petId).stream().map(this::mapVariant).toList();
    }

    private PetImageDto mapImage(PetImage image) {
        return new PetImageDto(image.getId(), image.getImageUrl(), image.getAltText(), image.getSortOrder(), image.getPrimaryImage());
    }

    private PetVariantDto mapVariant(PetVariant variant) {
        return new PetVariantDto(
                variant.getId(),
                variant.getSize(),
                variant.getBreedVariation(),
                variant.getPrice(),
                variant.getSalePrice(),
                variant.getStockQuantity(),
                variant.getActive(),
                variant.getFeatured(),
                variant.getTrending(),
                variant.getSortOrder()
        );
    }
}