# ADR-003 Multi Tenancy

Status: Accepted

## Decision

Organization is the tenant boundary.

Every business resource is scoped to an organization.

Backend queries enforce this boundary.
