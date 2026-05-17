package com.lugtu.petstore.repository;

import com.lugtu.petstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserEmailOrderByCreatedAtDesc(String email);

    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);
}