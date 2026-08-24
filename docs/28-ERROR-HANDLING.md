# Error Handling

Formato estándar:

```json
{
  "code": "TASK_NOT_ASSIGNABLE",
  "message": "Task cannot be assigned.",
  "requestId": "...",
  "details": {}
}
```

## Tipos

- ValidationError
- AuthorizationError
- NotFoundError
- ConflictError
- ProcessEngineError
- StorageError
- IntegrationError

## Regla

No exponer stack traces al cliente en producción.
