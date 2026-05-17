package com.lugtu.petstore.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:}")
    private String springDatasourceUrl;

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${spring.datasource.username:}")
    private String springDatasourceUsername;

    @Value("${spring.datasource.password:}")
    private String springDatasourcePassword;

    @Bean
    @Primary
    @ConditionalOnMissingBean(DataSource.class)
    public DataSource dataSource() {
        try {
            HikariConfig cfg = new HikariConfig();
            ConnectionDetails connectionDetails = resolveConnection(firstNonBlank(springDatasourceUrl, databaseUrl));
            if (connectionDetails == null) {
                return new HikariDataSource();
            }

            cfg.setJdbcUrl(connectionDetails.jdbcUrl());
            if (connectionDetails.username() != null) {
                cfg.setUsername(connectionDetails.username());
            }
            if (connectionDetails.password() != null) {
                cfg.setPassword(connectionDetails.password());
            }

            if (connectionDetails.jdbcUrl() != null && !connectionDetails.jdbcUrl().contains("localhost")) {
                cfg.addDataSourceProperty("sslmode", "require");
            }
            return new HikariDataSource(cfg);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to configure DataSource from environment", ex);
        }
    }

    private ConnectionDetails resolveConnection(String rawUrl) throws Exception {
        if (rawUrl == null || rawUrl.isBlank()) {
            return null;
        }
        if (rawUrl.startsWith("jdbc:")) {
            return new ConnectionDetails(rawUrl,
                    nonBlank(springDatasourceUsername),
                    nonBlank(springDatasourcePassword));
        }

        URI uri = new URI(rawUrl);
        String host = uri.getHost();
        int port = uri.getPort() > 0 ? uri.getPort() : 5432;
        String path = uri.getPath() != null ? uri.getPath() : "";
        String userInfo = uri.getUserInfo();
        String username = null;
        String password = null;
        if (userInfo != null && !userInfo.isBlank()) {
            String[] parts = userInfo.split(":", 2);
            username = parts[0];
            if (parts.length > 1) {
                password = parts[1];
            }
        }
        return new ConnectionDetails(String.format("jdbc:postgresql://%s:%d%s", host, port, path), username, password);
    }

    private String firstNonBlank(String first, String second) {
        if (first != null && !first.isBlank()) {
            return first;
        }
        if (second != null && !second.isBlank()) {
            return second;
        }
        return null;
    }

    private String nonBlank(String value) {
        return value != null && !value.isBlank() ? value : null;
    }

    private record ConnectionDetails(String jdbcUrl, String username, String password) {}
}
