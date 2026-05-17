# API Contract: Pet Store

## Conventions

- Base path: `/api/v1`
- Auth: `Authorization: Bearer <token>`
- All write endpoints validate input and return structured errors.
- Admin endpoints require the `ADMIN` role.

## Auth

### `POST /auth/register`
Create a customer account.

Request:
```json
{
  "fullName": "Alex Doe",
  "email": "alex@example.com",
  "password": "Secret123!"
}
```

### `POST /auth/login`
Authenticate a user and return a JWT.

Request:
```json
{
  "email": "alex@example.com",
  "password": "Secret123!"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "fullName": "Alex Doe",
    "email": "alex@example.com",
    "role": "CUSTOMER"
  }
}
```

### `GET /auth/me`
Return the current authenticated user.

## Pets

### `GET /pets`
List pets with optional `category` and `search` filters.

### `GET /pets/{id}`
Return pet details.

### `GET /pets/categories/{category}`
Return pets in a specific category.

## Cart

### `GET /cart`
Return the active cart for the current user.

### `POST /cart/items`
Add a pet to the cart.

### `PATCH /cart/items/{itemId}`
Update cart item quantity.

### `DELETE /cart/items/{itemId}`
Remove a cart item.

### `DELETE /cart`
Clear the cart.

## Orders

### `POST /orders`
Create an order from the active cart.

### `GET /orders`
List the current user’s orders.

### `GET /orders/{id}`
Return a single order with items.

### `GET /orders/{id}/status`
Return the current order status.

## Admin Pets

### `POST /admin/pets`
Create a pet listing.

### `PUT /admin/pets/{id}`
Update a pet listing.

### `DELETE /admin/pets/{id}`
Delete or deactivate a pet listing.

### `PATCH /admin/pets/{id}/inventory`
Adjust inventory for a pet listing.

## Admin Orders

### `GET /admin/orders`
List all orders.

### `PATCH /admin/orders/{id}/status`
Update order status.

## Error Shape

```json
{
  "timestamp": "2026-05-15T12:00:00Z",
  "status": 400,
  "error": "Validation failed",
  "message": "price must be greater than zero",
  "path": "/api/v1/admin/pets"
}
```
