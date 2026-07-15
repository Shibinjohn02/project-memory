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