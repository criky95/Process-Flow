# AGENTS.md

Este documento contiene reglas obligatorias para cualquier agente de IA que modifique ProcessFlow.

## Antes de modificar código

Leer:

- README.md
- SECURITY.md
- docs/02-PRD.md
- docs/03-ARCHITECTURE.md
- docs/04-DOMAIN-MODEL.md
- docs/05-PROCESS-ENGINE.md

Además, leer cualquier documento relacionado con la tarea.

## Reglas

- No realizar cambios arquitectónicos silenciosamente.
- No cambiar contratos públicos sin actualizar documentación.
- No eliminar tests para hacer que el build pase.
- No desactivar TypeScript strict.
- No introducir `any` sin justificación.
- No almacenar secretos.
- No saltarse autorización.
- No saltarse tenant isolation.
- No modificar versiones publicadas de procesos.
- No borrar audit logs.

## Flujo obligatorio

Analyze  
↓  
Design  
↓  
Implement  
↓  
Test  
↓  
Document  
↓  
Verify

## Antes de finalizar

Ejecutar:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Cambios arquitectónicos

Crear ADR.

## Prioridad de autoridad

1. ADR aprobado
2. SECURITY.md
3. ARCHITECTURE.md
4. DOMAIN-MODEL.md
5. PRD.md
6. otros documentos
7. código existente

Si existe contradicción, reportarla antes de introducir una decisión irreversible.
