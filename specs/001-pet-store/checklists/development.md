# Development Checklist: Pet Store

**Purpose**: Implementation-focused checklist for the Pet Store full-stack build
**Created**: 2026-05-15
**Feature**: [spec.md](../spec.md)

## 1. Project Setup

- [ ] CHK001 [MVP] [Easy] Create separate `backend` and `frontend` project folders with clear ownership boundaries.
- [ ] CHK002 [MVP] [Easy] Initialize the Spring Boot backend with Maven, Java version, and base app startup.
- [ ] CHK003 [MVP] [Easy] Initialize the React frontend with Vite or equivalent, plus Tailwind and MUI dependencies.

## 2. Backend Setup

- [ ] CHK004 [MVP] [Medium] Set up Spring Boot package structure for controller, service, repository, dto, entity, security, and config layers.
- [ ] CHK005 [MVP] [Medium] Add REST API versioning, global exception handling, and request/response validation support.
- [ ] CHK006 [MVP] [Medium] Configure Spring Data JPA, PostgreSQL connection, and migration tooling.

## 3. Frontend Setup

- [ ] CHK007 [MVP] [Medium] Establish React routing, app layout, and shared providers for auth and API state.
- [ ] CHK008 [MVP] [Medium] Build reusable UI primitives for cards, dialogs, forms, loading states, and toasts.
- [ ] CHK009 [MVP] [Medium] Configure Axios API client, environment-based base URL, and response interceptor handling.

## 4. Authentication

- [ ] CHK010 [MVP] [Hard] Implement user registration, login, JWT issuance, and protected session handling.
- [ ] CHK011 [MVP] [Hard] Add role-based authorization for Admin and Customer access paths.
- [ ] CHK012 [Medium] Wire frontend auth screens, route guards, and token persistence/refresh behavior.

## 5. Database Design

- [ ] CHK013 [MVP] [Hard] Create normalized tables for users, pets, carts, cart_items, orders, order_items, and inventory_records.
- [ ] CHK014 [MVP] [Hard] Add migrations, constraints, indexes, and foreign keys for stock, order, and role integrity.
- [ ] CHK015 [Medium] Add seed data for the initial pet categories: dogs, cats, birds, and fishes.

## 6. Pet Catalog Features

- [ ] CHK016 [MVP] [Medium] Implement browse, category filter, search, and pet detail endpoints in the backend.
- [ ] CHK017 [MVP] [Medium] Build catalog, filter, search, and detail views in the frontend.
- [ ] CHK018 [Medium] Display pet fields for name, category, breed, age, gender, price, description, stock, image URL, and vaccination status.

## 7. Cart & Checkout

- [ ] CHK019 [MVP] [Hard] Implement cart create, add item, update quantity, remove item, and clear cart operations.
- [ ] CHK020 [MVP] [Hard] Implement checkout flow that validates stock, creates an order, and updates inventory atomically.
- [ ] CHK021 [Medium] Build cart and checkout screens with totals, quantity controls, and empty-state handling.

## 8. Admin Dashboard

- [ ] CHK022 [MVP] [Hard] Implement admin CRUD endpoints for pets and inventory updates.
- [ ] CHK023 [MVP] [Hard] Implement admin order list and order status management endpoints.
- [ ] CHK024 [Medium] Build admin dashboard pages for pet management, inventory edits, and order tracking.

## 9. API Integration

- [ ] CHK025 [MVP] [Medium] Connect frontend screens to backend auth, catalog, cart, checkout, and admin APIs through Axios services.
- [ ] CHK026 [MVP] [Medium] Add API error mapping, retry-safe messaging, and loading state wiring across pages.
- [ ] CHK027 [Medium] Document endpoint contracts and align request/response DTOs with the frontend needs.

## 10. Security

- [ ] CHK028 [MVP] [Hard] Enforce JWT protection on all private routes and API endpoints.
- [ ] CHK029 [MVP] [Hard] Validate inputs server-side for auth, pet, cart, order, and admin actions.
- [ ] CHK030 [Medium] Add secure secret handling, password hashing, and protected admin-only navigation.

## 11. Testing

- [ ] CHK031 [MVP] [Hard] Add backend tests for auth, catalog, cart, checkout, and admin service flows.
- [ ] CHK032 [MVP] [Hard] Add frontend tests for route guards, catalog browsing, cart actions, and checkout flow.
- [ ] CHK033 [Medium] Add integration tests for stock validation, order creation, and role-based access control.

## 12. Deployment

- [ ] CHK034 [MVP] [Medium] Prepare Render configuration for backend web service, frontend static site, and managed PostgreSQL.
- [ ] CHK035 [MVP] [Medium] Add production environment variables, build commands, and startup commands for both apps.
- [ ] CHK036 [Medium] Document database migration and release steps for production deploys.

## 13. Production Readiness

- [ ] CHK037 [MVP] [Medium] Verify responsive behavior, loading states, and error states on common user flows.
- [ ] CHK038 [MVP] [Medium] Add health checks, structured logs, and basic operational diagnostics.
- [ ] CHK039 [Medium] Review performance, scalability, and security gaps before launch.

## Optional Advanced Features

- [ ] CHK040 [Easy] Add pagination or infinite scroll for larger catalog sizes.
- [ ] CHK041 [Medium] Add payment-provider integration beyond basic checkout.
- [ ] CHK042 [Medium] Add richer order analytics or admin reporting views.

## Notes

- [MVP] items cover the first release path from setup through deployment.
- Advanced items are intentionally deferred and should not block launch.
