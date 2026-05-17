# Tasks: Pet Store

**Input**: Approved spec, checklist, and implementation plan from `/specs/001-pet-store/`
**Goal**: MVP-first full-stack pet store with Spring Boot, PostgreSQL, React, Tailwind, MUI, JWT auth, cart/checkout, admin dashboard, and Render deployment
**Order**: Development order optimized for a solo developer

## Phase 1: Setup and Foundations

- [ ] T001 [P] Create `backend/` and `frontend/` project folders and baseline repository structure.
  - Description: Split the workspace into isolated backend and frontend app roots.
  - Dependencies: None
  - Difficulty: Easy
  - Expected result: Separate app folders exist and match the plan structure.

- [ ] T002 [P] Initialize the Spring Boot 3 backend with Java 17+, Maven, and base application bootstrap.
  - Description: Create the backend project and verify it starts locally.
  - Dependencies: T001
  - Difficulty: Easy
  - Expected result: Backend runs from `backend/` with a healthy startup.

- [ ] T003 [P] Initialize the React Vite frontend with Tailwind CSS and MUI.
  - Description: Create the frontend app shell and install the core UI stack.
  - Dependencies: T001
  - Difficulty: Easy
  - Expected result: Frontend runs from `frontend/` with Tailwind and MUI available.

- [ ] T004 Configure shared developer tooling for formatting, linting, and env files.
  - Description: Add code style and environment file conventions for both apps.
  - Dependencies: T002, T003
  - Difficulty: Easy
  - Expected result: Consistent formatting and local env handling are in place.

## Phase 2: Backend Foundation

- [ ] T005 [P] Create the Spring Boot package structure for config, security, controller, dto, entity, repository, service, mapper, and exception layers.
  - Description: Establish clean layered architecture boundaries.
  - Dependencies: T002
  - Difficulty: Medium
  - Expected result: Backend folders support service-layer development cleanly.

- [ ] T006 [P] Configure PostgreSQL, Spring Data JPA, and migration tooling.
  - Description: Wire database connection and schema migration support.
  - Dependencies: T002, T005
  - Difficulty: Medium
  - Expected result: Backend connects to PostgreSQL and can run migrations.

- [ ] T007 [P] Add global error handling, validation, and request/response DTO conventions.
  - Description: Standardize API errors and input validation.
  - Dependencies: T005
  - Difficulty: Medium
  - Expected result: API errors and validation responses are consistent.

- [ ] T008 Implement JWT security configuration and role-based authorization scaffolding.
  - Description: Add token validation, protected routes, and admin role checks.
  - Dependencies: T005, T007
  - Difficulty: Hard
  - Expected result: Backend can protect endpoints by authentication and role.

## Phase 3: Data Model and Persistence

- [ ] T009 [P] Define JPA entities for User, Pet, Cart, CartItem, Order, OrderItem, and InventoryRecord.
  - Description: Model the core domain objects used by the app.
  - Dependencies: T005, T006
  - Difficulty: Hard
  - Expected result: Entity classes match the approved data model.

- [ ] T010 [P] Create repository interfaces for auth, catalog, cart, order, and inventory access.
  - Description: Add database access points for each domain area.
  - Dependencies: T009
  - Difficulty: Medium
  - Expected result: Repositories support the first round of service implementation.

- [ ] T011 Add database migrations for users, pets, carts, cart_items, orders, order_items, and inventory_records.
  - Description: Implement the normalized PostgreSQL schema with constraints and indexes.
  - Dependencies: T006, T009
  - Difficulty: Hard
  - Expected result: Schema can be created and migrated cleanly in PostgreSQL.

- [ ] T012 Add seed data for the four pet categories and starter catalog entries.
  - Description: Populate an initial catalog for development and demo use.
  - Dependencies: T011
  - Difficulty: Medium
  - Expected result: The app opens with sample pets for dogs, cats, birds, and fishes.

## Phase 4: Authentication MVP

- [ ] T013 Implement backend auth services for registration, login, password hashing, and JWT issuance.
  - Description: Add account creation and token generation logic.
  - Dependencies: T008, T009, T010, T011
  - Difficulty: Hard
  - Expected result: Users can register and log in to receive a JWT.

- [ ] T014 Implement auth controllers and `/auth/me` user lookup endpoint.
  - Description: Expose auth flows through REST endpoints.
  - Dependencies: T013
  - Difficulty: Medium
  - Expected result: Client can register, log in, and fetch the current user.

- [ ] T015 [P] Build frontend auth state, token storage, and protected route guards.
  - Description: Keep the UI aware of auth state and role access.
  - Dependencies: T003, T014
  - Difficulty: Medium
  - Expected result: Login state survives refresh and protected routes redirect correctly.

- [ ] T016 Create frontend register and login pages with form validation and error display.
  - Description: Implement the customer auth screens.
  - Dependencies: T015
  - Difficulty: Medium
  - Expected result: Users can register and log in through the UI.

## Phase 5: Catalog MVP

- [ ] T017 Implement pet catalog read APIs for list, detail, category filter, and search.
  - Description: Deliver the backend catalog endpoints.
  - Dependencies: T010, T011, T012
  - Difficulty: Medium
  - Expected result: Pets can be browsed, filtered, searched, and opened by detail.

- [ ] T018 Build the responsive product gallery and pet detail pages.
  - Description: Render the customer-facing catalog UI.
  - Dependencies: T003, T015, T017
  - Difficulty: Medium
  - Expected result: The storefront shows a responsive grid and detail view.

- [ ] T019 Add reusable frontend catalog components for cards, filters, search, loading, error, and empty states.
  - Description: Create the shared UI pieces used by the storefront.
  - Dependencies: T018
  - Difficulty: Medium
  - Expected result: Catalog interactions look and behave consistently.

## Phase 6: Cart and Checkout MVP

- [ ] T020 Implement cart persistence and cart item operations in the backend.
  - Description: Add create, add, update, remove, and clear cart workflows.
  - Dependencies: T010, T011, T013
  - Difficulty: Hard
  - Expected result: Cart state persists per user and updates correctly.

- [ ] T021 Implement checkout flow with stock validation, order creation, and inventory updates.
  - Description: Convert the active cart into an order transactionally.
  - Dependencies: T020, T011, T013
  - Difficulty: Hard
  - Expected result: Checkout creates an order and reduces stock safely.

- [ ] T022 Build frontend cart page and checkout flow with totals and quantity controls.
  - Description: Give customers the full shopping path.
  - Dependencies: T018, T020, T021
  - Difficulty: Medium
  - Expected result: Users can manage quantities and place an order from the UI.

- [ ] T023 [P] Add frontend API services for auth, catalog, cart, and checkout requests.
  - Description: Centralize Axios calls and error mapping.
  - Dependencies: T003, T014, T017, T020, T021
  - Difficulty: Medium
  - Expected result: UI screens call the backend through a clean service layer.

## Phase 7: Admin Dashboard MVP

- [ ] T024 Implement admin pet CRUD and inventory update APIs.
  - Description: Support create, update, delete, and stock management for pets.
  - Dependencies: T008, T010, T011, T013
  - Difficulty: Hard
  - Expected result: Admins can manage the catalog and stock server-side.

- [ ] T025 Implement admin order listing and order status update APIs.
  - Description: Support operational order management.
  - Dependencies: T008, T010, T011, T013, T021
  - Difficulty: Hard
  - Expected result: Admins can inspect and update order status.

- [ ] T026 Build the admin dashboard UI for pet CRUD, inventory edits, and order tracking.
  - Description: Create the admin workflow screens in React.
  - Dependencies: T023, T024, T025
  - Difficulty: Hard
  - Expected result: Admin users can manage pets, stock, and orders in the browser.

## Phase 8: Integration and Verification

- [ ] T027 [P] Add backend integration tests for auth, catalog, cart, checkout, and admin flows.
  - Description: Verify the API behavior end-to-end at the service boundary.
  - Dependencies: T014, T017, T020, T021, T024, T025
  - Difficulty: Hard
  - Expected result: Core backend flows are covered by automated tests.

- [ ] T028 [P] Add frontend tests for route guards, gallery browsing, cart actions, and checkout flow.
  - Description: Verify the main UI journeys.
  - Dependencies: T015, T018, T022, T026
  - Difficulty: Hard
  - Expected result: Main UI flows are test-covered and stable.

- [ ] T029 Add integration checks for stock enforcement, role-based access, and order history retrieval.
  - Description: Validate the riskiest cross-feature behavior.
  - Dependencies: T027, T028
  - Difficulty: Medium
  - Expected result: Checkout and authorization behave correctly together.

## Phase 9: Deployment and Production Readiness

- [ ] T030 [P] Prepare Render deployment configuration for backend web service, frontend static site, and PostgreSQL.
  - Description: Add the production deployment setup for all services.
  - Dependencies: T006, T023, T026
  - Difficulty: Medium
  - Expected result: Render-ready config exists for all runtime components.

- [ ] T031 Add production environment variables, startup commands, and build commands for both apps.
  - Description: Make deployments reproducible and environment-driven.
  - Dependencies: T030
  - Difficulty: Medium
  - Expected result: Render can build and start the app without source edits.

- [ ] T032 Document migration, release, and smoke-test steps for production deployment.
  - Description: Capture the minimum release process for solo maintenance.
  - Dependencies: T031
  - Difficulty: Easy
  - Expected result: Deployment steps are documented and repeatable.

- [ ] T033 Finalize responsive behavior, health checks, logs, and startup diagnostics.
  - Description: Improve production visibility and release confidence.
  - Dependencies: T029, T031, T032
  - Difficulty: Medium
  - Expected result: The app is deployable and diagnosable in production.

## MVP Delivery Order

1. Complete T001-T012 to establish the foundation and data model.
2. Complete T013-T023 to deliver login, catalog, cart, and checkout.
3. Complete T024-T026 to unlock admin operations.
4. Complete T027-T033 to verify, deploy, and harden the release.

## Recommended VS Code Extensions

- `ms-azuretools.vscode-docker`
- `vscjava.vscode-java-pack`
- `redhat.java`
- `vscjava.vscode-spring-boot-dashboard`
- `vscjava.vscode-spring-initializr`
- `esbenp.prettier-vscode`
- `dbaeumer.vscode-eslint`
- `bradlc.vscode-tailwindcss`
- `ms-vscode.vscode-typescript-next`
- `mikestead.dotenv`

## Recommended npm Packages

- `react-router-dom`
- `axios`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `clsx`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `@tanstack/react-query` if API caching becomes useful later
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`

## Recommended Spring Boot Dependencies

- `spring-boot-starter-web`
- `spring-boot-starter-validation`
- `spring-boot-starter-security`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-test`
- `postgresql`
- `flyway-core` or `liquibase-core`
- `jjwt-api`, `jjwt-impl`, `jjwt-jackson`
- `lombok` if the team prefers it
- `spring-boot-starter-actuator`
- `springdoc-openapi-starter-webmvc-ui` if OpenAPI docs are added

## Suggested Folder Structures

### Backend

```text
backend/src/main/java/.../petstore/
├── config/
├── security/
├── controller/
├── dto/
├── entity/
├── mapper/
├── repository/
├── service/
├── service/impl/
├── exception/
└── PetStoreApplication.java
```

### Frontend

```text
frontend/src/
├── app/
│   ├── routes/
│   ├── layouts/
│   └── providers/
├── features/
│   ├── auth/
│   ├── catalog/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   └── admin/
├── components/
├── services/
├── hooks/
├── utils/
└── assets/
```

## Suggested Git Commit Naming

- `feat: setup backend foundation`
- `feat: add jwt auth flow`
- `feat: implement pet catalog`
- `feat: add cart and checkout`
- `feat: add admin dashboard`
- `test: cover checkout and auth`
- `chore: prepare render deployment`

## Suggested Sprint Grouping

- **Sprint 1**: T001-T012, backend/frontend foundation and database schema
- **Sprint 2**: T013-T023, auth, catalog, cart, checkout, and UI integration
- **Sprint 3**: T024-T033, admin workflow, tests, deployment, and production readiness
