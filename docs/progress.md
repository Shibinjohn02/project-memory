# Progress Log

## Session 1

### Completed

- Finalized the product vision and scope.
- Created the project documentation.
- Defined project principles.
- Created the development roadmap.
- Added architecture decision records (ADR).
- Defined the ingestion flow.
- Created schemas for:
  - Meeting
  - Jira Ticket
  - Pull Request
  - Commit
- Initialized the Express + TypeScript backend.
- Configured the project structure.
- Implemented the `/health` endpoint.

---

### Current Milestone

✅ Foundation Complete

---

### Current Task

Create the Documents module.

---

### Upcoming

1. Documents Module
2. Upload API
3. Document Type Detection
4. Knowledge Extraction
5. PostgreSQL Integration
6. Embeddings
7. Context Engine

---

## Learnings

- Product design is more important than implementation.
- Project Memory stores knowledge, not documents.

---

## Completed

### Document Module

* Implemented document upload API.
* Added document persistence using PostgreSQL + Sequelize.
* Stored:

  * Source
  * Original filename
  * Content
  * Decisions
  * Action items
* Implemented document deletion.
* Implemented document retrieval by ID.
* Implemented document listing.
* Implemented search by document source.

### Validation

* Introduced reusable Zod validation middleware supporting:

  * Request body
  * Query parameters
  * Route parameters
* Added validation for upload and search endpoints.

### Memory Module

* Introduced a dedicated `memory.service.ts` to separate extracted knowledge from document lifecycle operations.
* Implemented:

  * Get Document Memory
  * Get Action Items
  * Get Timeline

### Response Mapping

* Added `memory.mapper.ts` to decouple database models from API responses.
* Introduced response mappers for:

  * Decisions
  * Action Items
* Timeline now reuses the same mapper layer.

### Domain Model Improvements

* Introduced structured domain types:

  * `Decision`
  * `ActionItem`
* Replaced `string[]` usage across the extraction pipeline with domain objects.
* Updated:

  * Document model
  * Meeting extraction result
  * Save document flow
  * Memory mappers

### Meeting Extraction

* Refactored decision extraction to return `Decision[]`.
* Refactored action item extraction to return `ActionItem[]`.
* Current extraction remains regex-based and serves as the baseline implementation.

## Current Architecture

```text
Upload
   ↓
Reader
   ↓
Parser
   ↓
Meeting Extractor
   ↓
Decision[] / ActionItem[]
   ↓
Document Service
   ↓
Repository
   ↓
PostgreSQL (JSONB)
```

Memory retrieval flow:

```text
Repository
   ↓
Memory Service
   ↓
Memory Mapper
   ↓
API Response
```

## Current APIs

* Health
* Upload Document
* Get Documents
* Search Documents
* Get Document
* Delete Document
* Get Document Memory
* Get Action Items
* Get Timeline

## Next Milestone

Move from simple regex-based extraction to richer structured knowledge extraction by identifying:

* Decision
* Reason
* Owner
* Due date
* Confidence
* Relationships between extracted memories