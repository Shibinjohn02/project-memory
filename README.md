# Project Memory

> Never lose the "why" behind your code.

## Overview

Project Memory is an AI-powered engineering memory system that helps software teams reconstruct the context behind technical decisions.

Unlike traditional RAG applications that simply retrieve documents, Project Memory connects meetings, Jira tickets, pull requests, commits, and documentation to explain why a decision was made, how it evolved, and what happened afterwards.

The goal is not to search documents.

The goal is to reconstruct engineering decisions.

## The Problem

Engineering teams can easily answer:

- What changed?
- When did it change?
- Who changed it?

But they struggle to answer:

- Why was this decision made?
- What alternatives were discussed?
- Which meeting introduced this idea?
- Which Jira ticket approved it?
- Which pull request implemented it?
- What happened after deployment?

As projects grow, this knowledge becomes scattered across multiple tools and is eventually lost.

Project Memory brings this context back together.

## Vision

To become the engineering team's long-term memory by preserving and reconstructing the reasoning behind technical decisions.


## MVP Goal

The first version of Project Memory will allow users to:

- Upload engineering documents
- Extract structured information
- Connect related engineering events
- Ask "WHY" questions instead of simple document searches
- Generate a timeline explaining how a technical decision evolved


## Project Status

🚧 Currently in active development.

Phase 1 focuses on building the data ingestion and context foundation.


## Roadmap

- [ ] Phase 1 — Foundation
- [ ] Phase 2 — Context Engine
- [ ] Phase 3 — Intelligence Layer

Detailed roadmap is available in `/docs/roadmap.md`.


## Documentation

- Vision
- Roadmap
- Architecture Decisions (ADR)
- Progress Log

Documentation is maintained inside the `/docs` directory.