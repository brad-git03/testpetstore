package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.PetVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetVariantRepository extends JpaRepository<PetVariant, Long> {
    List<PetVariant> findByPetIdAndActiveTrueOrderBySortOrderAscIdAsc(Long petId);

    List<PetVariant> findByPetIdOrderBySortOrderAscIdAsc(Long petId);
}