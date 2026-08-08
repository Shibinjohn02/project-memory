# Memory Model

## What is a Memory?
A Memory is a structured piece of organizational knowledge extracted from one or more sources that can be understood and retrieved without reading the original document.

## Memory Types
Decision
Action Item
Fact
Risk
Constraint
Open Question

## Common Fields

- id
- type
- content
- documentId
- createdAt

## Type-specific Fields

### Decision
- reason
- status

### Action Item
- owner
- status
- dueDate

### Fact
- No additional fields

### Risk
- severity
- mitigation

### Constraint
- category

### Open Question
- status

## Relationships

- One Document can produce many Memories.
- Every Memory belongs to one Document.
- Memories can reference other Memories in the future.

## Design Principles

- Documents are ingestion artifacts.
- Memories are the primary domain model.
- Every memory must be understandable without opening the original document.
- Keep the base Memory model minimal.
- Type-specific information belongs to the memory type, not the base model.
- New memory types should only be introduced if they represent long-term organizational knowledge.