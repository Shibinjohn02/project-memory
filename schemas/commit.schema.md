# Commit Schema

## Purpose

Represents the structured knowledge extracted from a Git commit.

The goal is to capture what changed and why it changed.

---

## Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique commit identifier |
| commitHash | string | Yes | Git commit hash |
| message | string | Yes | Commit message |
| description | string | No | AI-generated explanation of the commit |
| linkedPullRequests | string[] | No | Related pull request IDs |
| linkedJiraTickets | string[] | No | Related Jira ticket IDs |
| summary | string | Yes | AI-generated summary |
| source | string | Yes | Original uploaded commit data |

---

## Example

```json
{
  "id": "commit-101",
  "commitHash": "a8f2b91",
  "message": "Add composite index on user_email",
  "description": "Added a database index to improve login performance.",
  "linkedPullRequests": [
    "pr-042"
  ],
  "linkedJiraTickets": [
    "PAY-243"
  ],
  "summary": "Introduced a composite database index to reduce login latency.",
  "source": "commit_a8f2b91.json"
}
```

---

## Notes

- Stores engineering knowledge, not Git metadata.
- The original commit is preserved separately for traceability.