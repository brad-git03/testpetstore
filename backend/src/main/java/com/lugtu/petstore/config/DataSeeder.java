package com.lugtu.petstore.config;

import com.lugtu.petstore.entity.User;
import com.lugtu.petstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@petstore.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("System Admin");
            admin.setEmail("admin@petstore.com");
            admin.setPasswordHash(passwordEncoder.encode("admin"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Admin user created: admin@petstore.com / admin");
        }
    }
}
