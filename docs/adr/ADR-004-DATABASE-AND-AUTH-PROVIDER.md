# ADR-004 Database and Auth Provider

Status: Accepted

## Context

ProcessFlow requiere un motor de persistencia relacional con garantías ACID, soporte para esquemas gráficos en `JSONB`, auditoría inmutable, aislamiento estricto por tenant (`TenantIsolation`) y control de acceso basado en roles (RBAC).

Se evaluaron dos alternativas principales de backend administrado/contenedorizado:
1. **Firebase (Firestore)**: Base de datos NoSQL basada en documentos.
2. **Supabase (PostgreSQL + Supabase Auth / GoTrue)**: Base de datos relacional PostgreSQL con RLS (Row Level Security) y servicio de autenticación JWT.

## Decision

Adoptar **Supabase (PostgreSQL + Supabase Auth)** como la solución de Base de Datos y Autenticación para ProcessFlow.

### Razones:
1. **Compatibilidad Relacional y Prisma ORM**: ProcessFlow utiliza un esquema relacional complejo (`tenants`, `users`, `roles`, `process_definitions`, `process_versions`, `process_instances`, `task_instances`, `audit_logs`). PostgreSQL es el motor nativo de Supabase y mantiene 100% la compatibilidad con Prisma ORM.
2. **Aislamiento Multi-Tenant (RLS)**: Row Level Security de PostgreSQL permite aplicar políticas de seguridad a nivel de base de datos para garantizar que ningún tenant pueda acceder a datos de otro.
3. **Autenticación e Integración JWT**: Supabase Auth (contenedor `supabase/gotrue` en Docker Compose) emite tokens JWT estándar conteniendo claims de usuario y tenant, consumibles directamente por los guardias de NestJS (`JwtAuthGuard`, `TenantGuard`, `RolesGuard`).
4. **Realtime**: Supabase Realtime facilita el envío de eventos de tareas y cambios en SLA directamente al cliente React.

## Consequences

- La configuración de Docker Compose incluirá la instancia de base de datos PostgreSQL lista para Supabase y el servicio de autenticación `supabase-auth` (GoTrue).
- El backend (`apps/api`) validará los tokens JWT firmados y aplicará el contexto del tenant en cada consulta de Prisma.
- El frontend (`apps/web`) incorporará la pantalla de Login con persistencia de sesión y Bearer token en llamadas a la API.
