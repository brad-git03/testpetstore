# Research Notes: Pet Store

## Decisions

### Authentication
Use JWT bearer tokens for the API and keep the frontend session lightweight by storing the token client-side for the MVP. The React app will attach the token through an Axios interceptor and rehydrate the session on app load.

**Rationale**: This keeps the implementation simple for a solo developer while still supporting protected routes and role-based API checks.

**Alternatives considered**:
- HttpOnly cookie sessions: stronger XSS protection, but more setup and cross-origin handling on Render.
- Refresh-token rotation: better long-term security, but too much moving parts for the first release.

### Database Shape
Use a normalized PostgreSQL schema with snapshot columns on order items and cart items, and keep stock on the pet record with an inventory audit table.

**Rationale**: It preserves historical order accuracy while keeping checkout logic simple and fast.

**Alternatives considered**:
- Fully denormalized order tables: simpler reads, but weak auditability.
- Separate inventory service: unnecessary complexity for an MVP storefront.

### Frontend State
Use React Router for navigation, a thin Axios service layer for API calls, and local feature state for cart/auth data.

**Rationale**: This keeps feature boundaries clear and avoids over-engineering state management before the product stabilizes.

**Alternatives considered**:
- Global state library for everything: more abstraction than needed for the initial scope.
- Server-driven UI: not aligned with the requested React app.

### Deployment
Deploy the backend as a Render Web Service, the frontend as a Render Static Site, and PostgreSQL as Render Free PostgreSQL.

**Rationale**: Matches the requested platform and keeps the production setup uniform with local development.

**Alternatives considered**:
- Container orchestration or self-managed DB: not necessary for the MVP and slower to operate.

### API Documentation
Document the API with a lightweight contract file in the feature folder and keep backend OpenAPI generation as a follow-up enhancement if time allows.

**Rationale**: The contract file is enough to drive implementation quickly without forcing extra tooling up front.

**Alternatives considered**:
- Full OpenAPI-first workflow: useful, but heavier than needed for this solo plan.
