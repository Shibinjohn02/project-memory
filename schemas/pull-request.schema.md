# Pull Request Schema

## Purpose

Represents the structured knowledge extracted from a pull request.

The goal is to capture what was implemented, why it was implemented, and how it connects to other engineering decisions.

---

## Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique pull request identifier |
| prNumber | string | Yes | Pull request number |
| title | string | Yes | Pull request title |
| description | string | Yes | Short description of the implementation |
| linkedJiraTickets | string[] | No | Related Jira tickets |
| linkedCommits | string[] | No | Related commit IDs |
| summary | string | Yes | AI-generated summary |
| source | string | Yes | Original uploaded document name or identifier |

---

## Example

```json
{
  "id": "pr-042",
  "prNumber": "42",
  "title": "Optimize Login API",
  "description": "Added composite index to improve login performance.",
  "linkedJiraTickets": [
    "PAY-243"
  ],
  "linkedCommits": [
    "commit-101"
  ],
  "summary": "Implemented database indexing to resolve login performance issues.",
  "source": "pr-42.md"
}
```

---

## Notes

- Stores implementation knowledge, not GitHub metadata.
- The original pull request is preserved separately for traceability.