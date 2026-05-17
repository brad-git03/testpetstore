package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartId(Long cartId);

    List<CartItem> findByCartIdOrderByCreatedAtAsc(Long cartId);

    java.util.Optional<CartItem> findByCartIdAndPetVariantId(Long cartId, Long petVariantId);
}