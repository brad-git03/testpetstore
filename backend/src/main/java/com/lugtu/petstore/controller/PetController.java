package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.PetImageDto;
import com.lugtu.petstore.dto.PetVariantDto;
import com.lugtu.petstore.entity.Pet;
import com.lugtu.petstore.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {
    @Autowired
    private PetService petService;

    @GetMapping
    public ResponseEntity<Page<Pet>> list(@RequestParam(required = false) String category,
                                          @RequestParam(required = false) String q,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "24") int size) {
        Page<Pet> result = petService.list(category, q, page, size);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> detail(@PathVariable Long id) {
        Pet p = petService.findById(id);
        if (p == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(p);
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<java.util.List<PetImageDto>> images(@PathVariable Long id) {
        return ResponseEntity.ok(petService.images(id));
    }

    @GetMapping("/{id}/variants")
    public ResponseEntity<java.util.List<PetVariantDto>> variants(@PathVariable Long id) {
        return ResponseEntity.ok(petService.variants(id));
    }
}
