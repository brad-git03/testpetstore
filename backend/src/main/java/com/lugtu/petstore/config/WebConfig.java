package com.lugtu.petstore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String localhost5173 = "http://localhost:5173";
        String localhost3000 = "http://localhost:3000";

        registry.addMapping("/api/**")
                .allowedOriginPatterns("https://*.onrender.com", localhost5173, localhost3000)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static assets if any (optional)
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}
