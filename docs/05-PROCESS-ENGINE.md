# Process Engine

## Objetivo

Ejecutar `ProcessVersion`.

## Estados de instancia

- DRAFT
- RUNNING
- WAITING
- SUSPENDED
- COMPLETED
- CANCELLED
- FAILED

## Estados de tarea

- PENDING
- READY
- ASSIGNED
- IN_PROGRESS
- WAITING
- COMPLETED
- REJECTED
- CANCELLED
- SKIPPED
- OVERDUE

## Node Types

- START
- HUMAN_TASK
- APPROVAL
- DECISION
- PARALLEL_SPLIT
- PARALLEL_JOIN
- TIMER
- DOCUMENT
- FORM
- NOTIFICATION
- SUBPROCESS
- END

## Ejecución

```text
START
↓
crear instancia
↓
activar nodo
↓
crear TaskInstance cuando sea humano
↓
esperar acción
↓
evaluar salida
↓
activar siguientes nodos
↓
END
↓
COMPLETED
```

## Regla

El frontend nunca decide qué nodo ejecutar después.

Eso pertenece al Process Engine.
