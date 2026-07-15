# Meeting Schema

## Purpose

Represents the structured knowledge extracted from an engineering meeting.

The goal is to capture the decisions made during the meeting rather than preserving the raw transcript.

---

## Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique meeting identifier |
| title | string | Yes | Meeting title |
| date | datetime | Yes | Date and time of the meeting |
| participants | string[] | Yes | List of meeting participants |
| topics | string[] | Yes | Main discussion topics |
| decisions | string[] | Yes | Technical decisions made during the meeting |
| actionItems | string[] | No | Tasks assigned during the meeting |
| summary | string | Yes | Short AI-generated summary of the meeting |
| source | string | Yes | Original uploaded document name or identifier |

---

## Example

```json
{
  "id": "meeting-001",
  "title": "Redis Session Storage Discussion",
  "date": "2026-01-12T10:00:00Z",
  "participants": [
    "Rahul",
    "Shubham",
    "Aman"
  ],
  "topics": [
    "Redis",
    "Session Storage",
    "Memory Leak"
  ],
  "decisions": [
    "Reduce Redis TTL from 24 hours to 2 hours"
  ],
  "actionItems": [
    "Monitor production memory usage for one week"
  ],
  "summary": "The team discussed Redis memory issues and decided to reduce the session TTL before considering infrastructure changes.",
  "source": "meeting_2026_01_12.txt"
}
```

---

## Notes

- This schema stores extracted engineering knowledge.
- It does not store the complete meeting transcript.
- The raw transcript will be preserved separately for traceability.