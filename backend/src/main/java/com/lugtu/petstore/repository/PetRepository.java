package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByCategoryIgnoreCaseAndIsActiveTrue(String category, Pageable pageable);

    @Query("SELECT p FROM Pet p WHERE p.isActive = true AND (lower(p.name) LIKE lower(concat('%', :q, '%')) OR lower(p.breed) LIKE lower(concat('%', :q, '%')) OR lower(p.description) LIKE lower(concat('%', :q, '%')))")
    Page<Pet> search(@Param("q") String q, Pageable pageable);
}
