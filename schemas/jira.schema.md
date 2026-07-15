# Jira Ticket Schema

## Purpose

Represents the structured knowledge extracted from an engineering Jira ticket.

The goal is to capture the engineering problem, its context, and the outcome.

---

## Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique ticket identifier |
| ticketId | string | Yes | Jira ticket ID (e.g., PAY-123) |
| title | string | Yes | Ticket title |
| type | string | Yes | Bug, Story, Task, Epic, etc. |
| status | string | Yes | Current ticket status |
| priority | string | Yes | Ticket priority |
| description | string | Yes | Short description of the problem |
| decisions | string[] | No | Decisions made while resolving the ticket |
| linkedMeetings | string[] | No | Related meeting IDs |
| linkedPullRequests | string[] | No | Related pull request IDs |
| summary | string | Yes | AI-generated summary |
| source | string | Yes | Original uploaded document name or identifier |

---

## Example

```json
{
  "id": "jira-001",
  "ticketId": "PAY-243",
  "title": "Login API is slow",
  "type": "Bug",
  "status": "Done",
  "priority": "High",
  "description": "Login requests are taking around 5 seconds during peak traffic.",
  "decisions": [
    "Add composite index on user_email"
  ],
  "linkedMeetings": [
    "meeting-001"
  ],
  "linkedPullRequests": [
    "pr-042"
  ],
  "summary": "A database index was added to improve login performance after identifying missing indexes as the root cause.",
  "source": "PAY-243.pdf"
}
```

---

## Notes

- This schema stores extracted engineering knowledge.
- It focuses on the problem, related decisions, and connected engineering artifacts.
- The original Jira ticket is preserved separately for traceability.