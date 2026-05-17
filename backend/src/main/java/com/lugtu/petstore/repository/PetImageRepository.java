package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.PetImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetImageRepository extends JpaRepository<PetImage, Long> {
    List<PetImage> findByPetIdOrderBySortOrderAscIdAsc(Long petId);
}