# Ingestion Flow

## Purpose

Defines how Project Memory processes an uploaded engineering document.

The objective is to convert raw engineering documents into structured engineering knowledge.

---

## Flow

User Uploads Document
        │
        ▼
Detect Document Type
        │
        ▼
Extract Raw Text
        │
        ▼
LLM Extracts Structured Knowledge
        │
        ▼
Validate Against Schema
        │
        ▼
Store Structured Data in PostgreSQL
        │
        ▼
Generate Embeddings
        │
        ▼
Store Embeddings in Vector Database

---

## Step 1 — Detect Document Type

Identify whether the uploaded document is a:

- Meeting Transcript
- Jira Ticket
- Pull Request
- Git Commit

---

## Step 2 — Extract Raw Text

Extract readable text from the uploaded document.

Examples:

- TXT
- PDF
- Markdown
- JSON

---

## Step 3 — LLM Knowledge Extraction

The LLM extracts structured engineering knowledge based on the corresponding schema.

Example:

Meeting Transcript

↓

Meeting Schema

↓

Structured JSON

---

## Step 4 — Schema Validation

Validate the extracted JSON against the predefined schema.

Only valid data should continue.

---

## Step 5 — Store Structured Data

Store the validated engineering knowledge in PostgreSQL.

Project Memory stores knowledge, not raw documents.

---

## Step 6 — Generate Embeddings

Generate embeddings from the structured engineering knowledge.

Embeddings are created after validation.

---

## Step 7 — Store Embeddings

Store embeddings in the vector database for semantic retrieval.

---

## Guiding Principle

Raw Documents

↓

Engineering Knowledge

↓

Context

↓

Reasoning

Not

Raw Documents

↓

Chat