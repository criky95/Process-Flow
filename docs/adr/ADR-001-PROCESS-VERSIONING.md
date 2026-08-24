# ADR-001 Process Versioning

Status: Accepted

## Context

Processes change over time while active instances may still exist.

## Decision

Published `ProcessVersion`s are immutable.

Each `ProcessInstance` stores the exact `processVersionId` used when started.

## Consequences

Older instances continue running correctly.

Historical reconstruction becomes possible.
