# Data Model: Pet Store

## Entities

### User
- `id`
- `fullName`
- `email`
- `passwordHash`
- `role` (`ADMIN`, `CUSTOMER`)
- `status` (`ACTIVE`, `DISABLED`)
- `createdAt`
- `updatedAt`

**Rules**
- Email must be unique.
- Password hashes must never be exposed to the frontend.
- Admin access is restricted by role.

### Pet
- `id`
- `name`
- `category` (`DOGS`, `CATS`, `BIRDS`, `FISHES`)
- `breed`
- `age`
- `gender`
- `price`
- `description`
- `stockQuantity`
- `imageUrl`
- `vaccinationStatus`
- `isActive`
- `createdAt`
- `updatedAt`

**Rules**
- Name, category, price, and stock are required.
- Stock quantity cannot go below zero.
- Inactive pets must not appear in the customer catalog.

### Cart
- `id`
- `userId`
- `status` (`ACTIVE`, `CHECKED_OUT`, `ABANDONED`)
- `createdAt`
- `updatedAt`

**Rules**
- One active cart per customer.
- Carts are tied to a single user.

### CartItem
- `id`
- `cartId`
- `petId`
- `quantity`
- `unitPriceSnapshot`
- `createdAt`
- `updatedAt`

**Rules**
- Quantity must be positive.
- Quantity cannot exceed current available stock.
- Keep a price snapshot to prevent cart total drift.

### Order
- `id`
- `userId`
- `orderNumber`
- `status` (`CREATED`, `CONFIRMED`, `SHIPPED`, `CANCELLED`)
- `subtotal`
- `total`
- `createdAt`
- `updatedAt`

**Rules**
- Order number must be unique.
- Orders should be created from a validated cart snapshot.
- Status changes are controlled by backend workflow.

### OrderItem
- `id`
- `orderId`
- `petId`
- `petNameSnapshot`
- `quantity`
- `unitPriceSnapshot`
- `lineTotal`
- `createdAt`
- `updatedAt`

**Rules**
- Snapshot fields preserve the historical purchase record.
- Quantity and line totals are derived at checkout time.

### InventoryRecord
- `id`
- `petId`
- `changeType` (`IN`, `OUT`, `ADJUSTMENT`)
- `quantityChange`
- `reason`
- `createdAt`

**Rules**
- Every stock adjustment should create an audit row.
- Checkout should record inventory movement transactionally.

## Relationships

- A `User` has many `Orders`.
- A `User` has at most one active `Cart`.
- A `Cart` has many `CartItems`.
- A `Pet` can appear in many `CartItems`, `OrderItems`, and `InventoryRecords`.
- An `Order` has many `OrderItems`.

## State Transitions

- Cart: `ACTIVE` -> `CHECKED_OUT` when checkout succeeds.
- Order: `CREATED` -> `CONFIRMED` after successful order creation.
- Order: `CONFIRMED` -> `SHIPPED` later in the admin workflow.
- Order: any active state -> `CANCELLED` if an admin or business rule cancels it.
