# PROMPT MAESTRO — UI/UX PROCESSFLOW

Actúa como Product Designer Senior, UX Architect y Frontend Engineer especializado en aplicaciones empresariales complejas.

Diseña e implementa la interfaz profesional de ProcessFlow.

Antes de comenzar lee:

- README.md
- docs/01-PRODUCT-VISION.md
- docs/02-PRD.md
- docs/06-PROCESS-DESIGNER.md
- docs/07-ROLES-PERMISSIONS.md
- docs/22-UI-UX.md
- docs/23-DESIGN-SYSTEM.md
- docs/26-ACCEPTANCE-CRITERIA.md

No diseñes ProcessFlow como una aplicación genérica de administración.

Debe sentirse como una herramienta profesional de gestión y arquitectura de procesos.

---

# PRINCIPIO DE UX

Cada perfil debe ver una experiencia diferente según su trabajo.

Los perfiles principales son:

- Process Architect
- Participant
- Supervisor
- Process Owner
- Administrator
- Viewer

No mostrar herramientas del arquitecto a usuarios normales.

---

# NAVEGACIÓN PRINCIPAL

Crear navegación adaptada al rol.

## Usuario operativo

- Inicio
- Mis tareas
- Procesos
- Casos
- Documentos
- Notificaciones

## Supervisor

- Inicio
- Equipo
- Tareas
- Procesos
- Casos
- SLA
- Analítica

## Arquitecto

- Procesos
- Diseñador
- Versiones
- Componentes
- Formularios
- Simulación
- Publicaciones

## Administrador

- Organización
- Usuarios
- Roles
- Áreas
- Calendarios
- Integraciones
- Auditoría
- Configuración

---

# DASHBOARD

Debe mostrar información útil y accionable.

Ejemplo:

- Mis tareas: 14
- Vencen hoy: 3
- Vencidas: 2
- En espera: 4

Mostrar:

- tareas prioritarias;
- actividad reciente;
- SLA;
- procesos activos;
- notificaciones;
- carga de trabajo cuando corresponda.

No llenar el dashboard de gráficos decorativos.

---

# PROCESS DESIGNER

Debe ser una de las interfaces principales.

Utilizar `@xyflow/react`.

Layout conceptual:

```text
┌──────────────────────────────────────────────────────────────┐
│ Breadcrumb │ Proceso │ versión │ Guardado │ Validar │ Publicar│
├────────────┬───────────────────────────────┬─────────────────┤
│ PALETA     │                               │ PROPIEDADES     │
│            │                               │                 │
│ Inicio     │          CANVAS               │ General         │
│ Tarea      │                               │ Responsable     │
│ Decisión   │    [Solicitud]                │ SLA             │
│ Aprobación │         │                     │ Formularios     │
│ Documento  │         ▼                     │ Documentos      │
│ Firma      │    [Validación]               │ Reglas          │
│ Espera     │         │                     │ Notificaciones  │
│ Paralelo   │         ▼                     │                 │
│ Subproceso │     <¿Cumple?>                │                 │
│ Fin        │                               │                 │
└────────────┴───────────────────────────────┴─────────────────┘
```

---

# NODOS

Diseñar visualmente diferentes tipos:

- Start
- Human Task
- Approval
- Decision
- Parallel Gateway
- Timer
- Document
- Form
- Notification
- Signature
- Subprocess
- End

Los nodos deben mostrar únicamente información importante.

Ejemplo:

```text
┌──────────────────────┐
│ 👤 Revisión técnica  │
│ Analista Técnico     │
│ SLA: 2 días          │
└──────────────────────┘
```

Evitar nodos enormes.

---

# PROPIEDADES DE ACTIVIDAD

Al seleccionar un nodo mostrar panel lateral.

Tabs:

- General
- Assignment
- Instructions
- Forms
- Documents
- SLA
- Rules
- Notifications
- Advanced

---

# ASSIGNMENT

Permitir seleccionar:

- Usuario específico
- Rol
- Área
- Grupo
- Supervisor
- Iniciador
- Responsable dinámico

Mostrar claramente:

`Assigned by: Role → Analista Técnico`

No guardar únicamente nombres de usuarios.

---

# PROCESS OVERVIEW

Crear página pública/interna legible para comprender un proceso.

Mostrar:

- Nombre
- Descripción
- Propósito
- Responsable
- Áreas
- Tiempo estimado
- SLA
- Requisitos
- Documentos
- Participantes
- Versión
- Fecha de publicación

Mostrar diagrama del proceso en modo lectura.

---

# TASK INBOX

Crear bandeja profesional.

Columnas:

- ID
- Proceso
- Actividad
- Caso
- Solicitante
- Prioridad
- Asignado
- Fecha asignación
- Vencimiento
- SLA
- Estado

Filtros:

- Mías
- Equipo
- Pendientes
- Vencidas
- Hoy
- Esta semana

---

# TASK DETAIL

Header:

- CASE-2026-00451
- Compra de bienes
- Estado
- Prioridad
- SLA

Contenido:

- Información del caso
- Datos del formulario
- Documentos
- Instrucciones
- Comentarios
- Historial

Panel lateral:

- Responsable
- Fecha creación
- Fecha límite
- Tiempo restante
- Etapa

Acciones:

- Completar
- Aprobar
- Rechazar
- Devolver
- Solicitar información
- Reasignar

Las acciones disponibles deben depender de permisos y configuración.

---

# CASE DETAIL

Crear página para visualizar una instancia completa.

Debe incluir:

- Resumen
- Timeline
- Process Map
- Tasks
- Documents
- Forms
- Comments
- Audit history

---

# TIMELINE

Representar eventos como:

```text
09:34
Solicitud ingresada

10:12
Documentación validada
María López

11:20
Asignado a Carlos

15:05
Revisión completada
```

Mostrar actor y duración cuando sea relevante.

---

# LIVE PROCESS MAP

Mostrar el diagrama con estados:

- Completed
- Current
- Waiting
- Skipped
- Error

La actividad actual debe destacar claramente.

No utilizar animaciones excesivas.

---

# SLA

Utilizar semáforo:

- Normal
- At risk
- Overdue

Además mostrar texto, por ejemplo:

`5 h restantes`

No depender únicamente de colores.

---

# SUPERVISOR

Crear pantalla de equipo.

Ejemplo:

- Carlos Pérez — 12 abiertas — 2 vencidas — 78% SLA
- María Torres — 7 abiertas — 0 vencidas — 96% SLA

Permitir:

- filtrar;
- reasignar;
- revisar carga;
- revisar vencimientos.

---

# ANALYTICS

Crear:

- Procesos iniciados
- Procesos terminados
- Tiempo promedio
- SLA compliance
- Casos vencidos
- Throughput

Además:

## Bottleneck Analysis

Ejemplo:

- Actividad: Revisión jurídica
- SLA objetivo: 8 h
- Promedio: 19.4 h
- Desviación: +142%

---

# PROCESS VERSIONS

Mostrar:

- v1 Archived
- v2 Archived
- v3 Published
- v4 Draft

Nunca dar la impresión de que editar v4 cambia v3.

---

# DOCUMENTS

Diseñar explorador documental con:

- nombre
- tipo
- versión
- estado
- autor
- fecha
- relación con caso

Preview cuando sea posible.

---

# SEARCH

Crear búsqueda global con:

`Ctrl/Cmd + K`

Buscar:

- procesos
- casos
- tareas
- documentos
- usuarios

---

# RESPONSIVE

Desktop es prioridad para:

- Process Designer
- Analytics
- Administration

Task Inbox y Case Detail deben funcionar correctamente en tablet y móvil.

---

# ACCESSIBILITY

WCAG AA.

Incluye:

- keyboard navigation
- focus visible
- aria labels
- contraste suficiente
- no comunicar estados solo mediante color

---

# DESIGN SYSTEM

Utilizar:

- Tailwind CSS
- shadcn/ui

Mantener:

- espaciado coherente;
- bordes discretos;
- tipografía legible;
- densidad empresarial;
- jerarquía clara.

No abusar de:

- gradientes;
- glassmorphism;
- sombras fuertes;
- tarjetas innecesarias;
- animaciones decorativas.

---

# ESTILO VISUAL

Quiero una estética:

- profesional
- moderna
- sobria
- minimalista
- tecnológica

Inspiración conceptual:

- Linear
- Notion
- Stripe Dashboard
- Jira moderno
- GitHub
- herramientas profesionales de workflow

NO copiar sus interfaces.

---

# IMPLEMENTACIÓN

Crear componentes reutilizables.

Ejemplos:

- ProcessNode
- TaskCard
- SlaBadge
- StatusBadge
- UserAvatar
- ProcessMiniMap
- CaseTimeline
- DocumentList
- AssignmentPicker
- RolePicker
- FormRenderer
- PropertyPanel
- CommandPalette

---

# ESTADOS OBLIGATORIOS

Cada pantalla debe diseñarse considerando:

- Loading
- Empty
- Error
- No permission
- Success
- Partial data

Nunca dejar pantallas vacías sin explicación.

---

# PRIMERA TAREA

Antes de escribir código:

1. analiza docs/22-UI-UX.md;
2. analiza docs/23-DESIGN-SYSTEM.md;
3. crea el mapa completo de navegación;
4. define layouts;
5. define componentes compartidos;
6. define pantallas;
7. define estados;
8. identifica componentes de @xyflow/react;
9. crea un plan de implementación.

Después empieza únicamente por:

- App Shell
- Navigation
- Dashboard
- Process List
- Process Designer shell

No desarrolles todas las pantallas simultáneamente.

Ejecuta:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

antes de finalizar.
