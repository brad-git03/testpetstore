package com.lugtu.petstore.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${FRONTEND_URL:}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String localhost5173 = "http://localhost:5173";
        String localhost3000 = "http://localhost:3000";

        String[] allowedOrigins;
        if (frontendUrl != null && !frontendUrl.isEmpty()) {
            allowedOrigins = new String[]{frontendUrl, localhost5173, localhost3000};
        } else {
            allowedOrigins = new String[]{localhost5173, localhost3000};
        }

        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins)
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
