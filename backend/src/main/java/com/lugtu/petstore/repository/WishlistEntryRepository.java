package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.WishlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistEntryRepository extends JpaRepository<WishlistEntry, Long> {
    List<WishlistEntry> findByUserEmailOrderByCreatedAtDesc(String email);

    Optional<WishlistEntry> findByUserEmailAndPetId(String email, Long petId);
}