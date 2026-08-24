# Architecture

## Principio

Separar diseño y ejecución.

```text
Web
↓
API
↓
Domain Services
↓
Process Engine
↓
Database / Queue / Storage
```

## Applications

### web

Interfaz.

### api

API, autenticación, dominio.

### worker

Timers, SLA, notificaciones y trabajos asíncronos.

## Packages

- process-engine
- process-schema
- database
- form-engine
- permissions
- ui
- shared

## Comunicación

REST para CRUD.

WebSocket para actualizaciones realtime.

BullMQ para tareas diferidas.

## Persistencia

PostgreSQL.

Documentos en object storage.

Redis no es source of truth.
