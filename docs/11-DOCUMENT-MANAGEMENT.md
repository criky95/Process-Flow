# Document Management

## Metadata

- id
- name
- mimeType
- size
- author
- instance
- task
- createdAt
- status

## Version

```text
Document
↓
DocumentVersion
```

## Estados

- DRAFT
- UNDER_REVIEW
- APPROVED
- REJECTED
- SIGNED
- ARCHIVED

## Storage

S3-compatible storage.

PostgreSQL almacena metadata.

No almacenar archivos binarios grandes directamente en PostgreSQL.

## Seguridad

URLs temporales.

Permisos verificados antes de entregar acceso.
