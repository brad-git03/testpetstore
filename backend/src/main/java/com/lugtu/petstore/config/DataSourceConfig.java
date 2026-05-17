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
            if (springDatasourceUrl != null && !springDatasourceUrl.isEmpty()) {
                HikariConfig cfg = new HikariConfig();
                cfg.setJdbcUrl(springDatasourceUrl);
                if (springDatasourceUsername != null && !springDatasourceUsername.isEmpty()) cfg.setUsername(springDatasourceUsername);
                if (springDatasourcePassword != null && !springDatasourcePassword.isEmpty()) cfg.setPassword(springDatasourcePassword);
                return new HikariDataSource(cfg);
            }

            if (databaseUrl == null || databaseUrl.isEmpty()) {
                return new HikariDataSource();
            }

            // Parse DATABASE_URL like: postgres://user:pass@host:port/db
            URI uri = new URI(databaseUrl);
            String userInfo = uri.getUserInfo();
            String username = null;
            String password = null;
            if (userInfo != null) {
                String[] parts = userInfo.split(":" , 2);
                username = parts[0];
                if (parts.length > 1) password = parts[1];
            }
            String host = uri.getHost();
            int port = uri.getPort();
            String path = uri.getPath();
            String jdbcUrl = String.format("jdbc:postgresql://%s:%d%s", host, port, path);

            HikariConfig cfg = new HikariConfig();
            cfg.setJdbcUrl(jdbcUrl);
            if (username != null) cfg.setUsername(username);
            if (password != null) cfg.setPassword(password);
            cfg.addDataSourceProperty("sslmode", "require");
            return new HikariDataSource(cfg);
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to configure DataSource from environment", ex);
        }
    }
}
