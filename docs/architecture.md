# Architecture

The architecture will evolve over time.

Current high-level architecture:

User

↓

API

↓

Processing Pipeline

↓

Project Memory

↓

Response

---

Phase 1 components

- Backend API
- PostgreSQL
- Vector Database
- LLM

---

Future components

- Context Engine
- Decision Graph
- Timeline Generator
- Integrations

---

## Knowledge Processing Pipeline

Reader
↓
Parser
↓
Extractor
↓
Reasoner (AI)
↓
Storage

### Responsibilities

- Reader: Converts file bytes into text.
- Parser: Cleans and normalizes text.
- Extractor: Extracts structured facts.
- Reasoner: Generates insights and explains WHY.