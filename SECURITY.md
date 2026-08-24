# Security

## Authentication

- Secure password hashing.
- Access tokens.
- Refresh token rotation.

## Authorization

Backend enforcement.

RBAC inicialmente.

## Multi-tenancy

Every protected resource must be tenant scoped.

## Files

Validate:

- size
- mime type
- extension

Use signed temporary URLs.

## Audit

Sensitive actions require audit.

## Secrets

Environment variables or secret manager.

Never expose secrets to frontend.

## Security headers

Configure secure HTTP headers.

## Rate limiting

Required for authentication and public endpoints.

## Input

Validate all untrusted data.
