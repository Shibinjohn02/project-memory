# Project Roadmap

## Phase 1 — Foundation

**Goal:**
Create a reliable engineering knowledge foundation.

### Deliverables

* [x] Backend setup
* [x] Database schema
* [x] Document upload
* [x] Document parsing
* [x] Metadata extraction
* [ ] Embeddings
* [x] Search foundation
* [x] Memory extraction
* [x] Memory storage
* [x] Memory ranking
* [x] LLM-based question answering
* [x] Citation / evidence linking

### Current Architecture

```text
Document
   ↓
Parsing
   ↓
LLM Extraction
   ↓
Memory
   ↓
Search / Ranking
   ↓
Context
   ↓
LLM
   ↓
Answer + Citations
```

`Memory` is the source of truth for extracted engineering knowledge.

Decisions, action items, and future memory types are stored as individual memory records rather than being embedded inside the `Document` record.

### Outcome

Engineering data becomes searchable and usable as structured memory.

---

# Phase 2 — Context Engine

**Goal:**
Reconstruct engineering decisions and their context.

### Deliverables

* [x] Decision extraction
* [x] Action-item extraction
* [x] Timeline generation
* [x] Evidence linking
* [ ] Entity extraction
* [ ] Relationship mapping
* [ ] Multi-source reasoning
* [ ] Cross-document memory linking
* [ ] Decision context reconstruction

### Planned Capabilities

Project Memory should be able to answer questions such as:

* Why did we choose PostgreSQL?
* Who owns this action item?
* When was this decision made?
* What was the reason behind the decision?
* What happened after the decision?
* Which document or meeting contains the evidence?
* Are there multiple discussions related to the same decision?

### Outcome

Project Memory understands **engineering history**, not just individual documents.

---

# Phase 3 — Intelligence

**Goal:**
Provide proactive engineering insights instead of only answering questions.

### Deliverables / Ideas

* [ ] Impact analysis
* [ ] Decision drift detection
* [ ] Engineering summaries
* [ ] PR context suggestions
* [ ] Architecture evolution
* [ ] Decision conflict detection
* [ ] Related-memory suggestions
* [ ] Engineering knowledge gaps
* [ ] Proactive context during development

### Outcome

Project Memory becomes an **engineering assistant** that can surface useful context proactively.

---

# Phase 4 — Integrations

**Goal:**
Connect Project Memory to the tools where engineering knowledge is created.

### Integrations

* [ ] GitHub
* [ ] Jira
* [ ] Slack
* [ ] Confluence
* [ ] Notion
* [ ] Meeting recordings
* [ ] Pull requests
* [ ] Git commits

### Outcome

Project Memory becomes a unified engineering memory layer across the development workflow.

---

# Development Principles

### 1. Memory is the Source of Truth

Extracted engineering knowledge belongs in the `memories` system, not duplicated inside documents.

### 2. Build Required Architecture Correctly

If a component or architectural decision is **certain to be required**, implement it in its proper place from the beginning.

Do not introduce a temporary shortcut simply to save time if it will create unnecessary refactoring later.

> If we know we will need it, build it correctly now.
> If we don't need it yet, don't build it prematurely.

### 3. Avoid Premature Features

Do not build future functionality just because it might eventually be useful.

Only implement it when there is a clear requirement or architectural reason.

### 4. Evidence Matters

Answers should be backed by the memories that support them whenever possible.

### 5. Keep the Product Simple

Project Memory should solve the core problem before adding complexity.

> If a feature doesn't help answer **WHY**, it probably doesn't belong in Project Memory.

### 6. LLM Should Not Be the Database

The LLM is responsible for reasoning and generating answers.

Structured memories, metadata, relationships, and evidence remain in the application's database.

---

# Current Milestone

**Phase 1 — Foundation → Near Completion**

Completed:

* Document ingestion
* Meeting extraction
* Memory creation
* Memory persistence
* Keyword search
* Memory ranking
* Context construction
* Groq LLM integration
* Question answering
* Citations
* Timeline

Next major work:

**Embeddings + semantic search**

After that, continue into the deeper **Context Engine** capabilities.
