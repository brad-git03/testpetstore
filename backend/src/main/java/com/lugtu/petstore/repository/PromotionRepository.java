package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByActiveTrueOrderByCreatedAtDesc();
}