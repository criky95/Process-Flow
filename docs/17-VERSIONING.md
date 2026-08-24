# Process Versioning

## Regla principal

Una `ProcessVersion` publicada es inmutable.

## Workflow

```text
ProcessDefinition
↓
Draft
↓
Publish
↓
Version 1

Editar nuevamente:

Version 1
↓
New Draft
↓
Publish
↓
Version 2
```

## Instances

Una `ProcessInstance` siempre mantiene:

`processVersionId`

La publicación de v3 jamás altera una instancia iniciada usando v2.

## Estados

- DRAFT
- PUBLISHED
- ARCHIVED
