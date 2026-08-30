# Progress Log

## Session 1

### Completed

* Finalized the product vision and scope.
* Created the project documentation.
* Defined project principles.
* Created the development roadmap.
* Added architecture decision records (ADR).
* Defined the ingestion flow.
* Created schemas for:

  * Meeting
  * Jira Ticket
  * Pull Request
  * Commit
* Initialized the Express + TypeScript backend.
* Configured the project structure.
* Implemented the `/health` endpoint.

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

* Product design is more important than implementation.
* Project Memory stores knowledge, not documents.

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

### Memory Storage

* Added PostgreSQL `JSONB` storage for extracted memories.
* Added vector embeddings for semantic memory retrieval.
* Added memory types:

  * `decision`
  * `action-item`
  * `fact`
  * `risk`
  * `constraint`
  * `open-question`

### Semantic Memory Search

* Implemented semantic search using embeddings.
* Added LLM-based query understanding.
* Query understanding extracts:

  * `searchQuery`
  * `memoryType`
  * `status`
* Added filtering by `memoryType`.
* Added status filtering using the memory `metadata` JSONB field.
* Removed the distance threshold from active query filtering while retaining similarity distance for ranking.
* Verified semantic search ranking and filtering through API testing.

### Memory Q&A

* Added an answer generation layer using the existing Groq provider.
* Added `AnswerGeneratorProvider` abstraction.
* Implemented `GroqAnswerGeneratorProvider`.
* Connected memory retrieval with answer generation.
* Added the memory answer API.
* Answer generation receives the original question and relevant retrieved memories.
* Added hallucination protection:

  * Answers must use only retrieved memories.
  * The LLM must not use outside knowledge or assumptions.
  * The system explicitly handles questions for which the available memories do not contain enough information.
* Added fallback handling when no relevant memories are found.
* Verified:

  * Questions with known answers.
  * Questions with no relevant memories.
  * Questions where related information exists but the requested detail is not available.

## Current Architecture

### Document Ingestion

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

### Memory Retrieval & Q&A

```text
User Question
   ↓
Query Understanding (LLM)
   ↓
Search Query + Memory Type + Status
   ↓
Embedding
   ↓
Semantic Search
   ↓
Relevant Memories
   ↓
Answer Generator (LLM)
   ↓
Final Answer
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
* Memory Search
* Memory Answer

## Current Milestone

✅ Memory Retrieval + Q&A Pipeline Complete

The system can now take a natural-language question, understand the intended memory search, retrieve relevant memories using semantic search and metadata filters, and generate an answer grounded in those memories.

## Next Milestone

Improve the quality and richness of extracted memories by moving toward structured knowledge extraction.

Focus areas:

* Decision
* Reason
* Owner
* Due date
* Confidence
* Relationships between memories
* Richer memory metadata
* Improved extraction quality beyond the current regex baseline


## External API Limits

### Groq

Current model: `openai/gpt-oss-20b`

- Requests per minute: 30
- Requests per day: 1,000
- Tokens per minute: 8,000
- Tokens per day: 200,000

Used for:
- Query understanding
- Answer generation

### Jina

Used for:
- Text embeddings

- Free token pool: 10 million tokens
- This is a one-time free token pool, not a daily limit.

> Note: These limits are based on the current provider plans and should be re-checked if the plan or provider changes.


### 📅 31 Aug – 6 Sep: Document + Memory Completion

**31 Aug — Rich Memory Model**

* `Decision` / `ActionItem` structure improve
* `reason`
* `owner`
* `dueDate`
* `confidence`
* metadata cleanup
* DB/schema updates

**1 Sep — LLM Extraction**

* Regex baseline → LLM-based structured extraction
* Consistent JSON output
* Validation
* Multiple memory types

**2 Sep — Memory Storage**

* New extracted fields persist correctly
* Repository changes
* Mapping/domain model cleanup
* Existing APIs verify

**3 Sep — Retrieval**

* Semantic search refinement
* `memoryType`
* `status`
* relevance/ranking
* multiple relevant memories
* edge cases

**4 Sep — Answer Generation**

* Grounded answers
* insufficient information
* conflicting memories
* better context formatting
* source/document awareness

**5 Sep — End-to-End Testing**

* Meeting → memories → DB → embedding → search → answer
* Known questions
* Unknown questions
* Why/how questions
* filters
* multiple memories
* regression testing

**6 Sep — Cleanup + Documentation**

* Remove unnecessary/temporary code
* interfaces/types cleanup
* imports/folders cleanup
* `progress.md`
* architecture documentation
* final API verification
* commit/tag the Document + Memory milestone

### 🎯 End goal

Sunday tak ideally humare paas:

```text
                DOCUMENT
                   │
                   ▼
              LLM Extraction
                   │
                   ▼
        ┌─────────────────────┐
        │   Structured Memory │
        │                     │
        │ Decision            │
        │ Action Item         │
        │ Fact                │
        │ Risk                │
        │ Constraint          │
        │ Open Question       │
        │                     │
        │ + reason            │
        │ + owner             │
        │ + dueDate           │
        │ + confidence        │
        └──────────┬──────────┘
                   ▼
              PostgreSQL
                JSONB
                   │
                   ▼
              Embeddings
                   │
                   ▼
            Semantic Search
                   │
                   ▼
             Query Understanding
                   │
                   ▼
             Answer Generator
                   │
                   ▼
              Grounded Answer
```