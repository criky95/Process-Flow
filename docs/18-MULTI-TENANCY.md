# Multi-Tenancy

Unidad principal:

`Organization`.

Todo recurso de negocio debe pertenecer directa o indirectamente a una organización.

## Regla

Nunca confiar únicamente en IDs entregados por cliente.

Cada consulta debe comprobar `organizationId`.

## Prohibido

```text
SELECT resource WHERE id = inputId
```

sin comprobar el tenant correspondiente.
