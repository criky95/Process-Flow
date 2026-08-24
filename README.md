# ProcessFlow

ProcessFlow es una plataforma de gestión de procesos organizacionales que permite diseñar, publicar, ejecutar, supervisar, documentar, auditar y optimizar procesos mediante una interfaz visual.

## Objetivo

Convertir procesos organizacionales en workflows ejecutables.

Un arquitecto puede diseñar:

Solicitud
→ Revisión
→ Aprobación
→ Ejecución
→ Finalización

y ProcessFlow transforma ese diseño en:

- tareas;
- responsables;
- formularios;
- documentos;
- reglas;
- tiempos;
- SLA;
- notificaciones;
- historial;
- métricas.

## Conceptos

### Process Definition

Definición lógica de un proceso.

### Process Version

Versión publicada e inmutable.

### Process Instance

Ejecución real de una versión.

### Task Definition

Actividad definida por el arquitecto.

### Task Instance

Ejecución real asignada a una persona o grupo.

## Aplicaciones

- Procesos administrativos
- Compras
- Talento humano
- Aprobaciones
- Mantenimiento
- Solicitudes internas
- Procesos municipales
- Gestión documental
- Trámites
- Autorizaciones

## Arquitectura

Monorepo:

- apps/web
- apps/api
- apps/worker
- packages/process-engine
- packages/process-schema
- packages/database
- packages/form-engine
- packages/permissions
- packages/ui
- packages/shared

## Stack

### Frontend

- React
- TypeScript
- Vite
- @xyflow/react
- Tailwind CSS
- shadcn/ui

### Backend

- NestJS
- PostgreSQL
- Prisma
- Redis
- BullMQ

### Infraestructura

- Docker
- MinIO

## Documentación

La especificación completa se encuentra en `/docs`.

Orden recomendado:

1. Product Vision
2. PRD
3. Architecture
4. Domain Model
5. Process Engine
6. Process Designer
7. Security
8. Database
9. UI/UX

## Desarrollo

Instalar:

```bash
pnpm install
```

Levantar servicios:

```bash
docker compose up -d
```

Desarrollo:

```bash
pnpm dev
```

Verificación:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
