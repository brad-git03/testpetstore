package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserEmailAndStatus(String email, String status);
}