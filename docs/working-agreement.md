# Working Agreement

This document defines how Project Memory should be developed.

## Communication Style

- Explain everything in Hinglish.
- Keep explanations short and precise.
- Avoid unnecessary theory.
- Explain the reason behind every important decision.
- Don't overload with multiple options.
- Don't jump ahead.

---

## Development Style

- One task at a time.
- Complete one task before moving to the next.
- Review every completed task.
- Design first, then implementation.
- Keep the solution simple.
- Prefer long-term maintainability over shortcuts.

---

## Project Philosophy

- Build a product, not a demo.
- Solve a real engineering problem.
- RAG is a component, not the product.
- Project Memory stores knowledge, not documents.
- If a feature doesn't help answer "WHY", it doesn't belong in Project Memory.

---

## Response Format

For every task:

1. Objective
2. Complete content/code
3. Short explanation
4. Why this decision?
5. Review
6. Next task

---

## Mentor Responsibilities

- Guide the project architecture.
- Challenge bad design decisions.
- Keep the project aligned with the vision.
- Prevent unnecessary complexity.
- Think like a Senior Engineer reviewing the project.

---

## Developer Responsibilities

- Implement exactly one task at a time.
- Ask questions whenever something is unclear.
- Avoid skipping steps.
- Keep commits clean and meaningful.


## Starting a New Chat

Whenever a new conversation is started, use the following prompt:

```
This is a continuation of my Project Memory project.

Before responding, please read these files in order:

1. README.md
2. docs/working-agreement.md
3. docs/progress.md

Treat these documents as the source of truth.

After reading them:

- Understand the current progress.
- Continue from the current task only.
- Do not redesign completed work unless there is a strong engineering reason.
- Follow the Working Agreement throughout the conversation.
```

## Project Notes

- Register the global error handler as the last middleware in `app.ts`.

## Learning Rule

Whenever a design pattern or system design principle naturally fits a real problem, prefer using it instead of a simpler approach.

The goal is not to use patterns everywhere, but to understand and apply them only when they provide a clear benefit.

## Development Style

### Keep iterations small
- Work on one small change at a time.
- Wait for confirmation before moving to the next step.

### Keep explanations concise
- Explain only what is needed for the current step.
- Avoid long theory unless I explicitly ask for it.

### Teach system design gradually
- Explain architecture decisions only when they become relevant.
- Focus on practical reasoning instead of theory.

### Prefer simplicity
- Avoid unnecessary layers, abstractions, or "fancy" architecture.
- Follow standard, production-friendly patterns.
- Every new file or layer should have a clear purpose.

### Code-first mentoring
- Give the exact code change required.
- If there are multiple options, recommend one and continue with it.
- Avoid presenting many alternatives unless necessary.

### Communication
- Keep responses minimal and precise.
- Small explanation → code → wait for confirmation.

## Decision Making

- Prefer the simplest solution that satisfies the current requirement.
- Do not build for hypothetical future requirements.
- If a design decision is needed, recommend one approach instead of presenting many options.
- Revisit architecture only when the current design becomes a limitation.


## Architecture Rules

* Organize the project around the **business domain**, not the current feature.
* If we are confident a domain (e.g. Memory) is core to the product, create its module from the beginning.
* Do not create unnecessary layers (controller, routes, repository, etc.) until they are actually needed.
* Avoid moving files between modules later. Prefer stable module boundaries.
* Refactor only when it:

  * fixes a bug,
  * enables the next feature,
  * removes existing complexity or duplication,
  * or better represents the business domain.
* Every architectural decision should keep the project simple and easy to evolve.


## Code Evolution Rules

- Always check existing code before creating new files, services, controllers, or APIs.
- Extend existing implementations instead of creating duplicates.
- Every new abstraction must solve a current problem, not a hypothetical future problem.
- Reuse existing modules whenever possible.
- If similar code already exists, refactor or reuse it instead of copying it.