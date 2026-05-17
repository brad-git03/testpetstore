package com.lugtu.petstore.service;

import com.lugtu.petstore.dto.OrderItemResponse;
import com.lugtu.petstore.dto.OrderResponse;
import com.lugtu.petstore.entity.*;
import com.lugtu.petstore.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {
    private static final String ACTIVE = "ACTIVE";

    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderItemRepository orderItemRepository;
    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PetVariantRepository petVariantRepository;

    @Transactional
    public OrderResponse checkout(String email) {
        Cart cart = cartRepository.findByUserEmailAndStatus(email, ACTIVE)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        List<CartItem> items = cartItemRepository.findByCartIdOrderByCreatedAtAsc(cart.getId());
        if (items.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty");

        com.lugtu.petstore.entity.Order order = new com.lugtu.petstore.entity.Order();
        order.setUser(userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found")));

        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItem cartItem : items) {
            PetVariant variant = petVariantRepository.findById(cartItem.getPetVariant().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
            if (variant.getStockQuantity() < cartItem.getQuantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for checkout");
            }
            variant.setStockQuantity(variant.getStockQuantity() - cartItem.getQuantity());
            petVariantRepository.save(variant);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setPetVariant(variant);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItem.setLineTotal(cartItem.getLineTotal());
            order.getItems().add(orderItem);
            subtotal = subtotal.add(cartItem.getLineTotal());
        }

        order.setSubtotal(subtotal);
        order.setTotal(subtotal);
        com.lugtu.petstore.entity.Order saved = orderRepository.save(order);
        orderItemRepository.saveAll(order.getItems());
        cartItemRepository.deleteAll(items);

        return mapOrder(saved);
    }

    public List<OrderResponse> list(String email) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(email).stream().map(this::mapOrder).toList();
    }

    public OrderResponse detail(String email, Long orderId) {
        com.lugtu.petstore.entity.Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        if (!order.getUser().getEmail().equals(email)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your order");
        return mapOrder(order);
    }

    private OrderResponse mapOrder(com.lugtu.petstore.entity.Order order) {
        List<OrderItemResponse> items = orderItemRepository.findByOrderId(order.getId()).stream().map(this::mapItem).toList();
        return new OrderResponse(order.getId(), order.getStatus().name(), order.getSubtotal(), order.getTotal(), items, order.getCreatedAt());
    }

    private OrderItemResponse mapItem(OrderItem item) {
        PetVariant variant = item.getPetVariant();
        return new OrderItemResponse(item.getId(), variant.getId(), variant.getPet().getName(), variant.getSize(), item.getQuantity(), item.getUnitPrice(), item.getLineTotal());
    }
}