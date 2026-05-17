## Deployment README (Render Blueprint)

- Region: Singapore
- Services: Postgres (free), Backend (web), Frontend (static)

Required environment variables (set in Render service settings or from the attached Postgres):
- `DATABASE_URL` — Render-managed Postgres URL (postgres://user:pass@host:port/db)
- `SPRING_DATASOURCE_URL` (optional) — full JDBC URL (jdbc:postgresql://...)
- `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD` (optional)
- `JWT_SECRET` — required for production JWT signing
- `PORT` — Render assigns a port; app reads `${PORT}`
- `FRONTEND_URL` — optional: set to the frontend site URL to restrict CORS
- `VITE_API_BASE_URL` — frontend build-time API base URL

Notes:
- `backend` uses `application-prod.properties` and a `DataSourceConfig` to parse `DATABASE_URL` when necessary.
- Flyway migrations are enabled in production and run from `classpath:db/migration`.
- Keep secrets only in Render environment settings (do not commit to repo).
