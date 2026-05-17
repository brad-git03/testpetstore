package com.lugtu.petstore.controller;

import com.lugtu.petstore.dto.AuthRequest;
import com.lugtu.petstore.dto.AuthResponse;
import com.lugtu.petstore.dto.MeResponse;
import com.lugtu.petstore.dto.RegisterRequest;
import com.lugtu.petstore.entity.User;
import com.lugtu.petstore.repository.UserRepository;
import com.lugtu.petstore.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest body) {
        String email = body.email();
        if (userRepository.findByEmail(email).isPresent()) return ResponseEntity.status(409).body(Map.of("error", "email exists"));
        User u = new User();
        u.setEmail(email);
        u.setFullName(body.fullName());
        u.setPasswordHash(passwordEncoder.encode(body.password()));
        userRepository.save(u);
        String token = jwtUtils.generateToken(u.getEmail(), u.getRole());
        return ResponseEntity.ok(new AuthResponse(token, u.getRole(), u.getEmail(), u.getFullName()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest body) {
        String email = body.email();
        String password = body.password();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "invalid"));
        User u = userOpt.get();
        if (!passwordEncoder.matches(password, u.getPasswordHash())) return ResponseEntity.status(401).body(Map.of("error", "invalid"));
        String token = jwtUtils.generateToken(u.getEmail(), u.getRole());
        return ResponseEntity.ok(new AuthResponse(token, u.getRole(), u.getEmail(), u.getFullName()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) return ResponseEntity.status(401).build();
        String email = authentication.getName();
        var u = userRepository.findByEmail(email);
        if (u.isEmpty()) return ResponseEntity.status(401).build();
        User user = u.get();
        return ResponseEntity.ok(new MeResponse(user.getId(), user.getEmail(), user.getRole(), user.getFullName()));
    }
}
