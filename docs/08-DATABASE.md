# Database

PostgreSQL + Prisma.

## Entidades esenciales

- organizations
- users
- memberships
- roles
- departments
- process_definitions
- process_versions
- process_instances
- task_instances
- forms
- form_submissions
- documents
- document_versions
- sla_policies
- notifications
- audit_events

## JSONB

Puede utilizarse para:

- node configuration
- process graph
- dynamic form data

## Regla

Campos usados frecuentemente para búsqueda o relaciones no deben ocultarse innecesariamente dentro de JSONB.
