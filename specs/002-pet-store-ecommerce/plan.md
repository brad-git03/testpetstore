# Implementation Plan: Pet Store E-Commerce Platform

**Branch**: `[002-pet-store-ecommerce]` | **Date**: 2026-05-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-pet-store-ecommerce/spec.md`

**Note**: Plan is MVP-first and optimized for the existing Spring Boot + React Vite codebase.

## Summary

Deliver the platform in this order: stabilize the backend domain model and security, add catalog and commerce flows, then complete admin operations, frontend integration, and deployment hardening. Keep the current stack, preserve PostgreSQL as the source of truth, and deploy to Render with production-ready config and migrations.

## Technical Context

**Language/Version**: Java 17+ backend, React (Vite) frontend

**Primary Dependencies**: Spring Boot 3, Spring Data JPA, Spring Security JWT, Flyway, PostgreSQL, React, Tailwind CSS, MUI

**Storage**: PostgreSQL

**Testing**: Backend unit/integration tests, API flow checks, frontend component and page-flow tests

**Target Platform**: Web application deployed on Render

**Project Type**: Full-stack web application

**Performance Goals**: Fast catalog browsing, search, cart, and checkout for a normal storefront catalog size

**Constraints**: JWT-based access control, role-separated admin actions, DTO-based responses, responsive UI, persistent cart/order data, Flyway-managed schema changes

**Scale/Scope**: Single-store pet commerce platform with customer and admin experiences

## Constitution Check

*GATE: Must pass before implementation work starts.*

- Keep the solution inside the existing web app architecture.
- Preserve PostgreSQL as the system of record and use migrations for all schema changes.
- Enforce USER and ADMIN access rules on protected backend and frontend flows.
- Verify the MVP with automated tests before expanding into advanced merchandising and analytics.

## Project Structure

### Documentation (this feature)

```text
specs/002-pet-store-ecommerce/
├── plan.md
├── spec.md
├── checklists/
└── tasks.md
```

### Source Code (repository root)

```text
backend/
└── src/main/java/com/lugtu/petstore/
    ├── controller/
    ├── dto/
    ├── entity/
    ├── exception/
    ├── repository/
    ├── security/
    ├── service/
    ├── service/impl/
    ├── mapper/
    └── config/

backend/src/main/resources/db/migration/

frontend/
└── src/
    ├── features/
    ├── components/
    ├── routes/
    ├── services/
    ├── hooks/
    └── styles/
```

**Structure Decision**: Keep the existing two-app layout and extend it with a layered backend and feature-based frontend modules.

## Implementation Strategy

### 1. Backend Architecture

- Keep a strict Controller → Service → Repository flow.
- Add DTOs and mappers so UI responses stay stable and compact.
- Centralize validation, error handling, and auth/security configuration.
- Isolate order, cart, wishlist, catalog, and admin logic in separate services.

### 2. Database Schema Upgrades

- Add or extend tables for users, pets, pet_variants, pet_images, carts, cart_items, orders, order_items, wishlist_entries, and promotions.
- Use Flyway migrations to introduce the new schema in stages.
- Store order totals and item prices at checkout time so history remains stable.
- Track variant-level stock as the inventory source of truth.

### 3. API Expansion Strategy

- Ship REST endpoints by domain: auth/profile, catalog, cart, checkout, orders, wishlist, and admin.
- Support search, filtering, pagination, and admin-only actions from the start.
- Return DTOs tailored to listing, detail, cart, checkout, and dashboard views.
- Keep response shapes consistent so the frontend can move from mock data to live data without rewrites.

### 4. JWT + Role-Based Security Flow

- Authenticate users with JWT and derive role claims from the stored user record.
- Protect admin routes at the backend and mirror those guards in the frontend router.
- Block customer access to admin catalog, inventory, order, and promotion operations.
- Require validation and authorization checks on every write path.

### 5. Frontend Structure

- Organize the React app by feature: auth, catalog, cart, checkout, orders, wishlist, and admin.
- Keep shared UI primitives in reusable component modules.
- Use a single API service layer with auth-aware requests and response handling.
- Preserve responsive layouts for mobile-first browsing and desktop admin work.

### 6. E-commerce UI Flow

- Catalog page: search, filter, paginate, and browse products.
- Product page: gallery, variants, stock, pricing, and add-to-cart.
- Cart page: persistent items, quantity edits, and summary.
- Checkout page: order review, confirm action, and success state.

### 7. Admin Dashboard Flow

- Dashboard: basic counts for users, orders, and pets.
- Catalog management: pets, variants, images, featured/trending, and promos.
- Inventory management: adjust stock per variant.
- Order management: review and update lifecycle status.

### 8. Integration Strategy

- Start with the backend contract, then wire the frontend to real endpoints feature by feature.
- Replace static UI data only after each endpoint is covered by tests.
- Validate auth, cart persistence, and checkout together so state transitions stay aligned.
- Keep admin features behind role checks throughout integration.

### 9. Deployment Plan (Render)

- Configure backend, frontend, and PostgreSQL for environment-based deployment.
- Verify Flyway migrations run cleanly in the target environment.
- Use production build settings for the frontend and secure backend environment variables.
- Validate the full signup/login, browse, cart, checkout, and admin paths before release.

## MVP-First Roadmap

1. Backend foundation: schema, entities, security, DTOs, and validation.
2. Core commerce: catalog, product detail, cart, checkout, and order history.
3. Admin essentials: catalog edits, stock updates, and order status changes.
4. Frontend integration: live catalog, product, cart, checkout, and admin screens.
5. Quality pass: tests, error handling, responsive polish, and Render deployment.
6. Advanced follow-up: wishlist, promotions, analytics, search debounce, and UX refinements.

## Complexity Tracking

> No constitution violations require justification for the MVP plan.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |