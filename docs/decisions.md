# Architecture Decision Records (ADR)

This document records important project decisions.

---

## ADR-001

Decision

Project Memory will focus on engineering context instead of document search.

Reason

The real problem is context loss, not document retrieval.

Status

Accepted

---

## ADR-002

Decision

Project Memory will be built product-first, not AI-first.

Reason

AI is only a tool.

The product should remain valuable regardless of the underlying AI model.

Status

Accepted

---

## ADR-003

Decision

Every AI answer must include supporting evidence.

Reason

Engineering decisions require trust and verification.

Status

Accepted

---

# ADR-004: Module Pattern

## Status

Accepted

## Context

A consistent module structure was needed across the project.

## Decision

Each module will expose a single object for its controller, service, and repository.

Example:

```ts
export const documentService = {
  upload() {},
  detectType() {},
};
```

## Why?

- Keeps related functions together.
- Avoids unnecessary classes.
- Simple and scalable for an Express application.

---

# ADR-005: Dependency Management

## Status

Accepted

## Context

The project aims to remain lightweight and maintainable.

## Decision

A dependency will only be added when it solves an immediate problem in the project.

## Why?

- Keeps the project lightweight.
- Reduces unnecessary complexity.
- Avoids unused packages.

---

# ADR-006: API Response Format

## Status

Accepted

## Context

A consistent API response format is required across the project.

## Decision

All API responses will follow a common structure.

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "error": {
    "message": "..."
  }
}
```

## Why?

- Consistent API responses.
- Easier frontend integration.
- Easy to extend with error codes and metadata in the future.

---

# ADR-007: Centralized Error Handling

## Status

Accepted

## Context

The project requires a consistent way to handle errors.

## Decision

All errors will be handled by a single global Express error middleware.

Controllers and services should throw errors instead of sending error responses directly.

## Why?

- Consistent error responses.
- Less duplicate code.
- Easier to maintain.

---

# ADR-008: Avoid Generic Utility Folders

## Decision
Avoid generic folders such as utils or helpers.

Create purpose-based folders instead (e.g. express, responses, middleware).

Why:
Improves discoverability and prevents dumping unrelated code into a single folder.

---

# ADR-009: Purpose-Based Common Folders

## Status

Accepted

## Context

The project requires shared code across multiple modules.

## Decision

Use purpose-based folders (e.g. `http`, `responses`, `middleware`, `errors`) instead of generic folders like `utils` or `helpers`.

## Why?

- Improves code discoverability.
- Prevents unrelated code from accumulating in generic folders.
- Keeps the project structure explicit and maintainable.

---

# ADR-009: File Upload Library

## Status

Accepted

## Context

Project Memory accepts document uploads.

## Decision

Use Multer for handling multipart/form-data uploads.

## Why?

- Stable and widely adopted.
- Works well with Express.
- Simple for the project's requirements.

---

# ADR-010: Build Only What Is Needed (YAGNI)

---

# ADR-011: Extractor Factory

## Status

Accepted

## Context

Project Memory will support multiple document sources such as Meetings, Jira, Pull Requests and Commits.

## Decision

Use the Factory Pattern to select the appropriate extractor based on the document source.

## Why?

- Removes source-specific logic from the service.
- Makes it easy to add new document sources.
- Follows the Open/Closed Principle.

---

# ADR-012: Validation Library

## Status

Accepted

## Decision

Use Zod for request validation.

## Why?

- TypeScript-first
- Runtime validation
- Type inference
- Reusable schemas