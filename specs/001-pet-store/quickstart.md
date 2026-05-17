# Quickstart: Pet Store

## Prerequisites

- Java 17 or newer
- Node.js 20 or newer
- PostgreSQL
- Render account for deployment

## Local Setup

### Backend
1. Create the backend environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `JWT_SECRET`
   - `JWT_EXPIRATION_MS`
2. Start the backend from the `backend/` folder.
3. Run the Spring Boot app with the Maven wrapper or `mvn spring-boot:run`.

### Frontend
1. Install frontend dependencies from the `frontend/` folder.
2. Set `VITE_API_BASE_URL` to the backend URL.
3. Start the Vite dev server.

## Development Flow

1. Start PostgreSQL locally or point the backend at a development database.
2. Run backend migrations before starting the API.
3. Start the backend API.
4. Start the frontend.
5. Verify the main path: browse pets, inspect a pet, log in, add to cart, checkout, and view orders.

## Deployment Notes

- Deploy the backend as a Render Web Service.
- Deploy the frontend as a Render Static Site.
- Use Render PostgreSQL for production data.
- Set production environment variables in Render rather than in source files.
- Run migrations as part of the backend release process before exposing the frontend to users.

## Smoke Check

- Catalog loads successfully.
- Authenticated requests include the JWT token.
- Cart updates persist after refresh.
- Checkout creates an order and reduces stock.
- Admin-only routes are blocked for non-admin users.
