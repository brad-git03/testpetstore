<!--
Sync Impact Report
Version change: template placeholders -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME -> I. Product Scope Discipline
- PRINCIPLE_2_NAME -> II. Spring Boot API, React UI
- PRINCIPLE_3_NAME -> III. PostgreSQL as System of Record
- PRINCIPLE_4_NAME -> IV. Verified Releases
- PRINCIPLE_5_NAME -> V. Cloud-Ready Simplicity and Observability
Added sections:
- Technology & Delivery Constraints
- Workflow & Quality Gates
Removed sections:
- None
Templates requiring updates:
- .specify/templates/plan-template.md ✅ reviewed, no content changes required
- .specify/templates/spec-template.md ✅ reviewed, no content changes required
- .specify/templates/tasks-template.md ✅ reviewed, no content changes required
- .specify/templates/commands/*.md ⚠ no command files present to update
Follow-up TODOs:
- None
-->

# PetStore Constitution

## Core Principles

### I. Product Scope Discipline
The product MUST remain an e-commerce application for pets, limited to dogs,
cats, birds, and fish as the primary sellable pet categories. Product, catalog,
search, cart, checkout, and order flows MUST model that domain explicitly.
Any expansion to new pet categories or materially different commerce flows MUST
be treated as a governed scope change.

### II. Spring Boot API, React UI
The backend MUST be implemented in Java Spring Boot and expose application
capabilities through a versioned HTTP API. The frontend MUST be implemented in
React using Tailwind CSS and MUI. Shared behavior MUST be defined by explicit
API contracts and validated server-side; the frontend MUST not duplicate or
silently override backend business rules.

### III. PostgreSQL as System of Record
PostgreSQL MUST be the primary and authoritative datastore for production.
Schema changes MUST be delivered through migrations, and application logic MUST
treat persisted database state as the source of truth for inventory, products,
customers, carts, and orders. In-memory or file-backed substitutes are allowed
only for local development and automated testing.

### IV. Verified Releases
Critical user journeys MUST be covered by automated tests before release,
including browsing the catalog, viewing product details, updating the cart,
placing an order, and any payment or fulfillment integration. Backend changes
MUST include service and integration coverage for changed behavior; frontend
changes MUST include component or flow coverage for user-visible behavior.
Failures in these checks MUST block merge and deployment.

### V. Cloud-Ready Simplicity and Observability
The system MUST be deployable on Render using free-tier services: a web service
for the backend, a static site or static web service for the frontend, and a
managed PostgreSQL instance. Deployments MUST use environment-based
configuration, health checks, structured logs, and startup behavior that works
with ephemeral infrastructure. The simplest architecture that satisfies the
product and deployment requirements MUST be preferred.

## Technology & Delivery Constraints

The implementation stack is fixed for this constitution:

- Backend: Java Spring Boot.
- Database: PostgreSQL.
- Frontend: React, Tailwind CSS, and MUI.
- Deployment: Render free-tier services only, using managed PostgreSQL,
  a backend web service, and a frontend static hosting option.

Secrets, environment-specific endpoints, and deployment credentials MUST be read
from environment variables or platform configuration. Local development setups
MUST mirror production dependencies closely enough to exercise the same API and
database behavior.

## Workflow & Quality Gates

Every significant change MUST include the smallest appropriate validation for
its scope. Data model changes MUST include migrations. API changes MUST update
the contract or endpoint documentation used by the implementation. User-facing
behavior changes SHOULD be accompanied by tests that demonstrate the expected
flow before merge.

Pull requests and plan/spec/task artifacts MUST be reviewed for compliance with
this constitution. If a proposed change violates a principle, the violation MUST
be called out explicitly with the reason, the rejected simpler alternative, and
the migration path or follow-up work needed to restore compliance.

## Governance

This constitution supersedes conflicting guidance in templates, issue
descriptions, and runtime notes. Amendments require a documented rationale,
impact review, and a version bump using semantic versioning:

- MAJOR for removals or incompatible redefinitions of a principle.
- MINOR for adding a principle or materially expanding scope.
- PATCH for clarifications, wording changes, or non-semantic refinements.

Compliance review is mandatory for every plan, spec, task list, and release
candidate. Any intentional exception MUST be temporary, time-boxed, and tracked
with an explicit remediation task.

**Version**: 1.0.0 | **Ratified**: 2026-05-15 | **Last Amended**: 2026-05-15
