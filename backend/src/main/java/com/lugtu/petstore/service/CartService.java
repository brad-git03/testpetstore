package com.lugtu.petstore.service;

import com.lugtu.petstore.dto.CartItemRequest;
import com.lugtu.petstore.dto.CartItemResponse;
import com.lugtu.petstore.dto.CartResponse;
import com.lugtu.petstore.dto.CartQuantityRequest;
import com.lugtu.petstore.entity.Cart;
import com.lugtu.petstore.entity.CartItem;
import com.lugtu.petstore.entity.PetVariant;
import com.lugtu.petstore.entity.User;
import com.lugtu.petstore.repository.CartItemRepository;
import com.lugtu.petstore.repository.CartRepository;
import com.lugtu.petstore.repository.PetVariantRepository;
import com.lugtu.petstore.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    private static final String ACTIVE = "ACTIVE";

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetVariantRepository petVariantRepository;

    @Transactional
    public CartResponse getCart(String email) {
        return mapCart(loadOrCreateCart(email));
    }

    @Transactional
    public CartResponse addItem(String email, CartItemRequest request) {
        Cart cart = loadOrCreateCart(email);
        PetVariant variant = requireActiveVariant(request.petVariantId());
        int quantity = request.quantity();
        if (quantity < 1) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be at least 1");

        CartItem item = cartItemRepository.findByCartIdAndPetVariantId(cart.getId(), variant.getId()).orElse(null);
        if (item == null) {
            item = new CartItem();
            item.setCart(cart);
            item.setPetVariant(variant);
            item.setQuantity(quantity);
        } else {
            item.setQuantity(item.getQuantity() + quantity);
        }

        validateStock(item.getQuantity(), variant);
        syncItemPricing(item, variant);
        cartItemRepository.save(item);
        return mapCart(loadCart(cart.getId()));
    }

    @Transactional
    public CartResponse updateItem(String email, Long itemId, CartQuantityRequest request) {
        Cart cart = loadOrCreateCart(email);
        CartItem item = requireCartItem(cart.getId(), itemId);
        PetVariant variant = requireActiveVariant(item.getPetVariant().getId());
        validateStock(request.quantity(), variant);
        item.setQuantity(request.quantity());
        syncItemPricing(item, variant);
        cartItemRepository.save(item);
        return mapCart(loadCart(cart.getId()));
    }

    @Transactional
    public CartResponse removeItem(String email, Long itemId) {
        Cart cart = loadOrCreateCart(email);
        CartItem item = requireCartItem(cart.getId(), itemId);
        cartItemRepository.delete(item);
        return mapCart(loadCart(cart.getId()));
    }

    private Cart loadOrCreateCart(String email) {
        return cartRepository.findByUserEmailAndStatus(email, ACTIVE).orElseGet(() -> {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setStatus(ACTIVE);
            return cartRepository.save(cart);
        });
    }

    private Cart loadCart(Long cartId) {
        return cartRepository.findById(cartId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));
    }

    private CartItem requireCartItem(Long cartId, Long itemId) {
        CartItem item = cartItemRepository.findById(itemId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart item not found"));
        if (!item.getCart().getId().equals(cartId)) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cart item does not belong to user");
        return item;
    }

    private PetVariant requireActiveVariant(Long variantId) {
        PetVariant variant = petVariantRepository.findById(variantId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
        if (!Boolean.TRUE.equals(variant.getActive())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Variant is not active");
        return variant;
    }

    private void validateStock(int requestedQuantity, PetVariant variant) {
        if (variant.getStockQuantity() == null || variant.getStockQuantity() < requestedQuantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Requested quantity exceeds stock");
        }
    }

    private void syncItemPricing(CartItem item, PetVariant variant) {
        BigDecimal unitPrice = variant.getSalePrice() != null ? variant.getSalePrice() : variant.getPrice();
        item.setUnitPrice(unitPrice);
        item.setLineTotal(unitPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
    }

    private CartResponse mapCart(Cart cart) {
        List<CartItemResponse> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItem item : cartItemRepository.findByCartIdOrderByCreatedAtAsc(cart.getId())) {
            CartItemResponse response = mapItem(item);
            items.add(response);
            subtotal = subtotal.add(response.lineTotal());
        }
        return new CartResponse(cart.getId(), cart.getStatus(), items, subtotal, subtotal);
    }

    private CartItemResponse mapItem(CartItem item) {
        PetVariant variant = item.getPetVariant();
        return new CartItemResponse(
                item.getId(),
                variant.getId(),
                variant.getPet().getName(),
                variant.getSize(),
                variant.getBreedVariation(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getLineTotal(),
                variant.getStockQuantity()
        );
    }
}