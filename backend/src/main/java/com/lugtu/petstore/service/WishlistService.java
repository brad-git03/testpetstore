package com.lugtu.petstore.service;

import com.lugtu.petstore.dto.WishlistItemResponse;
import com.lugtu.petstore.entity.Pet;
import com.lugtu.petstore.entity.WishlistEntry;
import com.lugtu.petstore.repository.PetRepository;
import com.lugtu.petstore.repository.UserRepository;
import com.lugtu.petstore.repository.WishlistEntryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class WishlistService {
    @Autowired private WishlistEntryRepository wishlistEntryRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PetRepository petRepository;

    public List<WishlistItemResponse> list(String email) {
        return wishlistEntryRepository.findByUserEmailOrderByCreatedAtDesc(email).stream().map(this::map).toList();
    }

    @Transactional
    public List<WishlistItemResponse> add(String email, Long petId) {
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pet not found"));
        wishlistEntryRepository.findByUserEmailAndPetId(email, petId).ifPresent(entry -> { throw new ResponseStatusException(HttpStatus.CONFLICT, "Already saved"); });
        WishlistEntry entry = new WishlistEntry();
        entry.setUser(userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found")));
        entry.setPet(pet);
        wishlistEntryRepository.save(entry);
        return list(email);
    }

    @Transactional
    public List<WishlistItemResponse> remove(String email, Long petId) {
        WishlistEntry entry = wishlistEntryRepository.findByUserEmailAndPetId(email, petId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wishlist item not found"));
        wishlistEntryRepository.delete(entry);
        return list(email);
    }

    private WishlistItemResponse map(WishlistEntry entry) {
        Pet pet = entry.getPet();
        return new WishlistItemResponse(entry.getId(), pet.getId(), pet.getName(), pet.getCategory(), pet.getImageUrl(), pet.getFeatured(), pet.getTrending());
    }
}