# API Contracts

## POST /documents

### Request

Content-Type: multipart/form-data

| Field | Type | Required |
|-------|------|----------|
| source | DocumentSource | Yes |
| file | File | Yes |

### Response

```json
{
  "success": true,
  "data": {
    "documentId": "doc_xxxxx",
    "status": "uploaded"
  }
}
```