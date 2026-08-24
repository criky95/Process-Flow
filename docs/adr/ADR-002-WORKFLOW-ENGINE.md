# ADR-002 Workflow Engine

Status: Accepted

## Decision

Process execution logic resides in a dedicated `process-engine` package.

Frontend never determines workflow transitions.

## Consequence

Business execution remains deterministic and independently testable.
