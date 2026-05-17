# Feature Specification: Pet E-Commerce Platform

**Feature Branch**: `[002-pet-store-ecommerce]`

**Created**: 2026-05-16

**Status**: Draft

**Input**: User description: "Upgrade the existing \"Pet Store\" application into a FULL-FEATURED e-commerce platform. Context: A basic version already exists with Spring Boot backend, PostgreSQL database with Flyway, JWT authentication, basic pet CRUD APIs, and a React Vite frontend with product gallery, basic cart, admin UI. Goal: Transform it into a production-level Pet E-Commerce System."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover and compare pets (Priority: P1)

As a shopper, I can browse pets, filter the catalog, search by name or category, compare variants and prices, and open a detail view that shows images, stock, and discount information so I can decide what to buy.

**Why this priority**: Product discovery is the entry point for every purchase and determines whether the storefront is useful.

**Independent Test**: A tester can open the storefront, narrow the catalog using filters and search, and verify that the visible results, detail pages, and availability indicators match the selected criteria.

**Acceptance Scenarios**:

1. **Given** pets are available in the catalog, **When** I search, filter, and paginate the list, **Then** I see only the matching pets and can move between result pages.
2. **Given** a pet has multiple images, variants, and a discount, **When** I open its detail page, **Then** I can view the gallery, price tiers, stock status, and active promotion.

---

### User Story 2 - Purchase and track orders (Priority: P1)

As a signed-in customer, I can save my cart, review it later, complete checkout, and track the resulting order through its full lifecycle so I can finish purchases with confidence.

**Why this priority**: Persistent cart and checkout are the core revenue flow for the platform.

**Independent Test**: A tester can sign in, add items to the cart, leave and return later, complete checkout, and confirm that the order appears in history with the expected status updates.

**Acceptance Scenarios**:

1. **Given** I have items in my cart, **When** I return after ending my session, **Then** the same items are still present and totals are restored.
2. **Given** I review my cart and confirm checkout, **When** the order is submitted, **Then** I receive a confirmation and the order appears in my order history.
3. **Given** an order exists, **When** its status changes from pending to completed or cancelled, **Then** the customer can see the updated lifecycle state in order history.

---

### User Story 3 - Manage favorites and profile (Priority: P2)

As a customer, I can save favorite pets and update my profile details so I can return to items I like and keep my account information current.

**Why this priority**: Favorites and profile management improve retention and make repeat visits more useful.

**Independent Test**: A tester can sign in, add and remove favorites, update profile details, and verify the changes are retained after refresh or re-login.

**Acceptance Scenarios**:

1. **Given** I am viewing a pet, **When** I mark it as a favorite, **Then** it appears in my wishlist until I remove it.
2. **Given** I update my account information, **When** I save the changes, **Then** the updated details are shown on future visits.

---

### User Story 4 - Run the store as an admin (Priority: P1)

As an administrator, I can manage pets, variants, images, inventory, promotions, and orders while reviewing basic business stats so I can operate the store efficiently.

**Why this priority**: Administrative control is required to keep catalog data, stock, and orders accurate.

**Independent Test**: A tester with admin access can create and update catalog data, adjust stock and promotions, change order status, and verify that customer-facing views reflect the updates.

**Acceptance Scenarios**:

1. **Given** I have admin access, **When** I update stock or promotions, **Then** the storefront reflects the new availability and pricing.
2. **Given** an order needs attention, **When** I change its status, **Then** the new status is visible to the customer and in the admin dashboard.
3. **Given** I open the admin dashboard, **When** I review the summary view, **Then** I can see core counts for users, orders, and pets.

### Edge Cases

- What happens when a pet variant is added to cart but later becomes out of stock before checkout?
- How does the system handle a discounted price changing after a cart has already been saved?
- What happens when a search returns no matching pets or when a filter combination excludes all results?
- How does the system handle an order status change request that is not allowed by the current lifecycle state?
- What happens when a customer tries to access admin-only pages or actions without the correct role?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow shoppers to browse an active catalog of pets with search, category filtering, price filtering, availability filtering, and paginated results.
- **FR-002**: The system MUST show each pet’s detail view with images, variant options, stock status, current price, and any active promotional price.
- **FR-003**: The system MUST support pet variants so a shopper can choose among size, breed, and pricing options for the same pet listing.
- **FR-004**: The system MUST track inventory at the variant level and prevent customers from purchasing quantities that exceed available stock.
- **FR-005**: The system MUST allow administrators to mark pets as featured or trending and to manage promotional pricing.
- **FR-006**: The system MUST persist each signed-in customer’s cart so the cart contents remain available across sessions and devices.
- **FR-007**: The system MUST allow customers to add, update, and remove cart items before checkout.
- **FR-008**: The system MUST provide a checkout flow that shows an order summary, confirms the purchase, and creates an order record.
- **FR-009**: The system MUST maintain order statuses for PENDING, PAID, SHIPPED, COMPLETED, and CANCELLED orders.
- **FR-010**: The system MUST allow customers to view a history of their orders and inspect the details of each order.
- **FR-011**: The system MUST allow customers to add and remove favorite pets from a wishlist.
- **FR-012**: The system MUST allow customers to update their profile information.
- **FR-013**: The system MUST enforce USER and ADMIN access rules so that customer actions and administrative actions are separated.
- **FR-014**: The system MUST prevent non-admin users from accessing or modifying admin-only catalog, inventory, promotion, and order-management functions.
- **FR-015**: The system MUST provide administrators with dashboard visibility into basic counts for users, orders, and pets.
- **FR-016**: The system MUST allow administrators to update order status and inventory levels.
- **FR-017**: The system MUST expose complete read and write coverage for the core business entities needed to support catalog, cart, wishlist, checkout, orders, and administration.
- **FR-018**: The system MUST validate required fields and present clear, user-friendly error messages when submitted data is invalid or incomplete.
- **FR-019**: The system MUST return data in concise response shapes suitable for storefront, cart, checkout, order history, wishlist, and admin screens.
- **FR-020**: The system MUST support responsive customer and admin experiences across desktop and mobile screen sizes.

### Key Entities *(include if feature involves data)*

- **User**: An authenticated account that can act as a shopper or an administrator; key attributes include identity details, role, and profile information.
- **Pet**: A sellable catalog item representing a pet listing; key attributes include name, description, category, visibility, and merchandising flags.
- **PetVariant**: A purchasable version of a pet listing; key attributes include size, breed variation, price, stock level, and promotional price.
- **PetImage**: An image associated with a pet listing; key attributes include display order, caption, and primary image status.
- **Cart**: A persistent shopping container tied to a user account; key attributes include current contents and summary totals.
- **CartItem**: A line item inside a cart; key attributes include selected variant, quantity, and current price.
- **Order**: A completed or in-progress purchase record; key attributes include order total, lifecycle status, customer reference, and timestamps.
- **OrderItem**: A line item inside an order; key attributes include selected variant, purchased quantity, and final unit price.
- **WishlistEntry**: A saved favorite item for a customer; key attributes include user reference, pet reference, and saved timestamp.
- **Promotion**: A pricing or merchandising rule applied to catalog items; key attributes include discounted price, time window, and eligibility.

## Updated Architecture Design

### High-Level Structure

- **Storefront experience**: Public and signed-in customer pages for browsing, product detail, cart, checkout, orders, wishlist, and profile management.
- **Administration experience**: Protected admin pages for catalog maintenance, inventory control, promotions, order processing, and summary reporting.
- **Commerce services**: Business flows for catalog discovery, cart persistence, checkout, order history, wishlist, and profile updates.
- **Shared platform controls**: Authentication, authorization, validation, error handling, and response shaping applied consistently across all flows.

### Design Principles

- User-facing experiences are separated from administrative operations.
- Catalog, cart, checkout, and order functions remain consistent across the storefront and admin views.
- Data returned to the UI should be concise and purpose-built for each screen.
- Security and role checks should be enforced on every protected action.

## Database Schema Design

### Core Relationships

- A **User** can have one active **Cart**, many **Orders**, and many **WishlistEntries**.
- A **Pet** can have many **PetImages** and many **PetVariants**.
- A **Cart** contains many **CartItems**.
- An **Order** contains many **OrderItems**.
- A **WishlistEntry** links a **User** to a saved **Pet** or **PetVariant** depending on the final catalog experience.
- A **Promotion** may apply to a **Pet** or a **PetVariant** during a defined time window.

### Core Table Intent

- **users**: account identity, contact information, role, and profile fields.
- **pets**: catalog metadata, visibility, merchandising flags, and descriptive content.
- **pet_variants**: purchasable variant rows with price and stock tracking.
- **pet_images**: image metadata and display order for each pet.
- **carts**: one active cart per customer, persisted across sessions.
- **cart_items**: variant selections and quantities stored within a cart.
- **orders**: checkout records, lifecycle status, and customer ownership.
- **order_items**: purchased variants and frozen pricing at time of checkout.
- **wishlist_entries**: customer favorites for quick return visits.
- **promotions**: discount windows and pricing rules for eligible items.

## API Endpoint Structure

### Authentication and Profile

- **/api/auth**: sign in, sign up, token refresh or session renewal, and account access.
- **/api/users/me**: retrieve and update the signed-in user’s profile.

### Catalog

- **/api/pets**: list, search, filter, and paginate pets.
- **/api/pets/{petId}**: retrieve a single pet with detail information.
- **/api/pets/{petId}/images**: retrieve the image gallery for a pet.
- **/api/pets/{petId}/variants**: retrieve available variants and pricing options.

### Cart and Checkout

- **/api/cart**: retrieve the active cart and persist cart changes.
- **/api/cart/items**: add, update, and remove cart items.
- **/api/checkout**: review cart contents, confirm purchase, and create an order.

### Orders

- **/api/orders**: list the signed-in customer’s orders.
- **/api/orders/{orderId}**: retrieve order details and lifecycle status.
- **/api/orders/{orderId}/status**: update order lifecycle state where allowed.

### Wishlist

- **/api/wishlist**: list, add, and remove favorite pets.

### Administration

- **/api/admin/dashboard**: retrieve summary counts for users, orders, and pets.
- **/api/admin/pets**: manage catalog entries, visibility, featured/trending flags, and merchandising fields.
- **/api/admin/inventory**: review and update stock levels.
- **/api/admin/promotions**: manage discounting and promotional windows.
- **/api/admin/orders**: review and update order statuses.

## Frontend Page Structure

### Customer Pages

- **Home / Catalog**: landing page with product discovery, filters, search, pagination, and skeleton loading states.
- **Pet Detail**: image gallery, variant selection, pricing, stock indicators, and add-to-cart action.
- **Cart**: persistent cart view with quantity changes and order summary.
- **Checkout**: review screen followed by purchase confirmation.
- **Orders**: order history and order detail views.
- **Wishlist**: saved favorite pets.
- **Profile**: account information and updates.
- **Login / Register**: authentication entry points.

### Administration Pages

- **Admin Dashboard**: summary cards and operational snapshot.
- **Admin Catalog**: manage pets, variants, images, and merchandising flags.
- **Admin Inventory**: review and adjust stock.
- **Admin Promotions**: manage discounts and promotional status.
- **Admin Orders**: review orders and update lifecycle status.

## MVP vs Advanced Feature Separation

### MVP Scope

- Browse and search the pet catalog.
- View pet details with images, variants, pricing, and stock.
- Persist cart state for signed-in users.
- Complete checkout and create orders.
- View order history and order status.
- Enforce customer and admin roles.
- Admin catalog, inventory, and order management.
- Update profile information.

### Advanced Scope

- Wishlist and favorites.
- Featured and trending merchandising.
- Discounted pricing and promotional scheduling.
- More refined dashboard analytics.
- Search debounce and richer loading states.
- Expanded customer-facing polish and conversion improvements.

## Development Phases Roadmap

### Phase 1 - Foundation

- Confirm the upgraded catalog and commerce data model.
- Establish role enforcement, validation, and consistent error handling.
- Prepare persistent cart, order, and wishlist foundations.

### Phase 2 - Commerce Core

- Implement catalog discovery, pet detail, image gallery, and variant selection.
- Deliver persistent cart and checkout flow.
- Add order creation, order history, and lifecycle display.

### Phase 3 - Administration

- Deliver admin dashboard summary views.
- Add catalog, inventory, promotion, and order management flows.
- Ensure admin-only access is enforced everywhere.

### Phase 4 - Experience and Optimization

- Add wishlist, search debounce, pagination polish, and skeleton loading states.
- Refine mobile responsiveness and screen-level consistency.
- Improve customer and admin usability based on testing feedback.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time shopper can find a pet, review its details, and add a variant to the cart in under 3 minutes.
- **SC-002**: At least 90% of signed-in shoppers can return to their saved cart and see the same items after ending their session.
- **SC-003**: At least 95% of completed checkouts produce an order confirmation and a visible entry in order history immediately after purchase.
- **SC-004**: Administrators can update stock or order status and see the change reflected in the relevant customer or admin view within one refresh cycle.
- **SC-005**: At least 90% of catalog visits on mobile and desktop can complete the primary browsing flow without layout issues that block purchase actions.

## Assumptions

- Existing authentication is retained and extended rather than replaced.
- The storefront remains a web application and mobile support is handled through responsive layouts rather than a separate app.
- Variant-level inventory is the source of truth for availability and checkout eligibility.
- Promotions are time-bounded and can affect either a pet listing or a pet variant.
- Order status transitions are controlled by business rules and not all transitions are allowed from every state.
