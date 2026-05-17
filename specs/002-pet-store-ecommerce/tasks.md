# Tasks: Pet Store E-Commerce Platform

**Input**: Approved spec, checklist, and implementation plan from `/specs/002-pet-store-ecommerce/`
**Goal**: MVP-first implementation for the upgraded pet commerce platform
**Order**: Priority-first, execution-ready, minimal wording

## Phase 1: Foundation

- [ ] T001 [CRITICAL] Set backend package layers.
  - Title: Backend layered structure
  - Short description: Create controller, dto, entity, repository, security, service, mapper, and exception packages.
  - Dependencies: None
  - Output result: Backend structure ready for feature work.
  - Difficulty: Easy

- [ ] T002 [CRITICAL] Set frontend feature structure.
  - Title: Frontend feature modules
  - Short description: Create auth, catalog, cart, checkout, orders, wishlist, and admin feature folders plus shared components.
  - Dependencies: None
  - Output result: Frontend structure ready for page work.
  - Difficulty: Easy

- [ ] T003 [CRITICAL] Configure app env patterns.
  - Title: Environment setup
  - Short description: Add local and production env handling for backend and frontend.
  - Dependencies: T001, T002
  - Output result: Config values load cleanly by environment.
  - Difficulty: Easy

## Phase 2: Database Tasks

- [ ] T004 [CRITICAL] Design core commerce schema.
  - Title: PostgreSQL schema upgrade
  - Short description: Add migrations for users, pets, pet_variants, pet_images, carts, cart_items, orders, order_items, wishlist_entries, and promotions.
  - Dependencies: T003
  - Output result: New schema can be migrated from scratch.
  - Difficulty: Hard

- [ ] T005 [CRITICAL] Add inventory and pricing constraints.
  - Title: Inventory integrity
  - Short description: Add stock, pricing, and foreign-key constraints with required indexes.
  - Dependencies: T004
  - Output result: Variant stock and pricing rules are enforced at the database level.
  - Difficulty: Hard

- [ ] T006 [CRITICAL] Seed starter catalog data.
  - Title: Initial catalog seed
  - Short description: Load sample pets, variants, and images for development and QA.
  - Dependencies: T004, T005
  - Output result: App starts with usable catalog data.
  - Difficulty: Medium

## Phase 3: Authentication Tasks

- [ ] T007 [CRITICAL] Implement JWT auth service.
  - Title: Auth service
  - Short description: Add registration, login, password hashing, and token issuance.
  - Dependencies: T004, T005
  - Output result: Users can register and receive JWTs.
  - Difficulty: Hard

- [ ] T008 [CRITICAL] Enforce role-based security.
  - Title: Security rules
  - Short description: Protect routes and enforce USER and ADMIN access.
  - Dependencies: T007
  - Output result: Protected endpoints reject unauthorized access.
  - Difficulty: Hard

- [ ] T009 [CRITICAL] Expose auth/profile endpoints.
  - Title: Auth API
  - Short description: Add login, register, and current-user profile endpoints.
  - Dependencies: T007, T008
  - Output result: Client can authenticate and read the signed-in profile.
  - Difficulty: Medium

## Phase 4: Product System Tasks

- [ ] T010 [CRITICAL] Model product variants and images.
  - Title: Product entities
  - Short description: Add pet variant and pet image entities with relationships.
  - Dependencies: T004, T005
  - Output result: Product data supports variants and galleries.
  - Difficulty: Hard

- [ ] T011 [CRITICAL] Build catalog read services.
  - Title: Catalog service
  - Short description: Implement list, detail, search, filter, and pagination logic.
  - Dependencies: T006, T010
  - Output result: Catalog data can be queried for storefront pages.
  - Difficulty: Medium

- [ ] T012 [CRITICAL] Expose catalog APIs.
  - Title: Catalog API
  - Short description: Add REST endpoints for product list, detail, images, and variants.
  - Dependencies: T011
  - Output result: Frontend can load product data from the backend.
  - Difficulty: Medium

- [ ] T013 [CRITICAL] Add stock and promo helpers.
  - Title: Pricing and stock logic
  - Short description: Calculate available stock, discount pricing, featured, and trending flags.
  - Dependencies: T010, T011
  - Output result: Product responses include stock and promo state.
  - Difficulty: Medium

## Phase 5: Cart & Order Tasks

- [ ] T014 [CRITICAL] Build persistent cart service.
  - Title: Cart persistence
  - Short description: Create cart and cart item operations stored per user.
  - Dependencies: T007, T010, T011
  - Output result: Cart remains saved between sessions.
  - Difficulty: Hard

- [ ] T015 [CRITICAL] Expose cart APIs.
  - Title: Cart API
  - Short description: Add endpoints for view, add, update, and remove cart items.
  - Dependencies: T014
  - Output result: Frontend can manage cart state.
  - Difficulty: Medium

- [ ] T016 [CRITICAL] Implement checkout and order creation.
  - Title: Checkout flow
  - Short description: Validate stock, create orders, freeze pricing, and decrement inventory.
  - Dependencies: T005, T014, T015
  - Output result: Checkout produces a confirmed order.
  - Difficulty: Hard

- [ ] T017 [CRITICAL] Build order history APIs.
  - Title: Order API
  - Short description: Add customer order list, order detail, and status lifecycle endpoints.
  - Dependencies: T016
  - Output result: Customers can review past orders and statuses.
  - Difficulty: Medium

## Phase 6: Wishlist Tasks

- [ ] T018 [ ] Add wishlist persistence.
  - Title: Wishlist entity
  - Short description: Store customer favorites linked to pets.
  - Dependencies: T004, T007, T010
  - Output result: Wishlist data persists per user.
  - Difficulty: Medium

- [ ] T019 [ ] Expose wishlist APIs.
  - Title: Wishlist API
  - Short description: Add endpoints to list, add, and remove favorites.
  - Dependencies: T018
  - Output result: Frontend can manage saved pets.
  - Difficulty: Easy

## Phase 7: Admin Tasks

- [ ] T020 [CRITICAL] Build admin catalog operations.
  - Title: Admin catalog API
  - Short description: Add admin create, update, delete, featured, and trending controls.
  - Dependencies: T008, T010, T012, T013
  - Output result: Admin can manage pet listings.
  - Difficulty: Hard

- [ ] T021 [CRITICAL] Build admin inventory operations.
  - Title: Admin inventory API
  - Short description: Add stock update endpoints for variants.
  - Dependencies: T005, T008, T013
  - Output result: Admin can change inventory levels.
  - Difficulty: Medium

- [ ] T022 [CRITICAL] Build admin order operations.
  - Title: Admin order API
  - Short description: Add order listing and status update endpoints.
  - Dependencies: T008, T016, T017
  - Output result: Admin can manage order lifecycle.
  - Difficulty: Medium

- [ ] T023 [CRITICAL] Add admin dashboard summary.
  - Title: Admin dashboard API
  - Short description: Return counts for users, orders, and pets.
  - Dependencies: T008, T020, T022
  - Output result: Admin dashboard can show core stats.
  - Difficulty: Easy

## Phase 8: Frontend Tasks

- [ ] T024 [CRITICAL] Build auth pages and guards.
  - Title: Frontend auth flow
  - Short description: Add login, register, token state, and protected routing.
  - Dependencies: T002, T009
  - Output result: Users can sign in and access role-based routes.
  - Difficulty: Medium

- [ ] T025 [CRITICAL] Build catalog page.
  - Title: Catalog UI
  - Short description: Add product listing, filters, search, pagination, and loading states.
  - Dependencies: T012, T013, T024
  - Output result: Users can browse and refine the catalog.
  - Difficulty: Medium

- [ ] T026 [CRITICAL] Build product detail page.
  - Title: Product detail UI
  - Short description: Add gallery, variants, stock, pricing, and add-to-cart actions.
  - Dependencies: T012, T013, T024, T025
  - Output result: Users can inspect a product and select a variant.
  - Difficulty: Medium

- [ ] T027 [CRITICAL] Build cart and checkout pages.
  - Title: Cart and checkout UI
  - Short description: Add persistent cart, quantity edits, order summary, and confirmation.
  - Dependencies: T015, T016, T024, T026
  - Output result: Users can complete checkout from the UI.
  - Difficulty: Hard

- [ ] T028 [CRITICAL] Build order and profile pages.
  - Title: Orders and profile UI
  - Short description: Add order history, order detail, and profile editing.
  - Dependencies: T009, T017, T024
  - Output result: Users can review orders and update account data.
  - Difficulty: Medium

- [ ] T029 [ ] Build wishlist page.
  - Title: Wishlist UI
  - Short description: Add favorites view and removal actions.
  - Dependencies: T019, T024
  - Output result: Users can manage saved pets.
  - Difficulty: Easy

- [ ] T030 [CRITICAL] Build admin dashboard pages.
  - Title: Admin UI
  - Short description: Add dashboard, catalog, inventory, and order management screens.
  - Dependencies: T020, T021, T022, T023, T024
  - Output result: Admin users can manage the store in the browser.
  - Difficulty: Hard

## Phase 9: API Integration Tasks

- [ ] T031 [CRITICAL] Wire frontend API service layer.
  - Title: API client
  - Short description: Centralize auth, catalog, cart, checkout, order, wishlist, and admin requests.
  - Dependencies: T009, T012, T015, T017, T019, T023
  - Output result: Frontend uses one consistent request layer.
  - Difficulty: Medium

- [ ] T032 [CRITICAL] Sync frontend state with backend.
  - Title: App data flow
  - Short description: Connect live responses to catalog, cart, orders, wishlist, and admin views.
  - Dependencies: T025, T026, T027, T028, T029, T030, T031
  - Output result: UI renders live data end to end.
  - Difficulty: Hard

## Phase 10: Deployment Tasks

- [ ] T033 [CRITICAL] Prepare Render services.
  - Title: Render setup
  - Short description: Configure backend service, frontend static site, and PostgreSQL instance.
  - Dependencies: T003, T031, T032
  - Output result: Deployment targets are defined and configured.
  - Difficulty: Medium

- [ ] T034 [CRITICAL] Add production build settings.
  - Title: Build and start config
  - Short description: Add environment variables, build commands, and startup commands.
  - Dependencies: T033
  - Output result: Render can build and run both apps.
  - Difficulty: Medium

- [ ] T035 [CRITICAL] Validate release readiness.
  - Title: Production smoke test
  - Short description: Verify login, browse, cart, checkout, admin access, and migrations in production mode.
  - Dependencies: T016, T017, T030, T033, T034
  - Output result: MVP is ready for release.
  - Difficulty: Medium

## MVP Delivery Order

1. T001-T006: foundation and database.
2. T007-T013: authentication and product system.
3. T014-T017: cart, checkout, and orders.
4. T020-T023: admin operations.
5. T024-T032: frontend and API integration.
6. T033-T035: deployment and release readiness.
