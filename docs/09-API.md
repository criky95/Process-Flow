# API

Base:

`/api/v1`

## Processes

```text
GET  /processes
POST /processes
GET  /processes/:id

POST /processes/:id/versions
POST /processes/:id/publish
```

## Instances

```text
POST /processes/:id/instances
GET  /instances/:id

POST /instances/:id/suspend
POST /instances/:id/resume
POST /instances/:id/cancel
```

## Tasks

```text
GET  /tasks
GET  /tasks/:id

POST /tasks/:id/claim
POST /tasks/:id/start
POST /tasks/:id/complete
POST /tasks/:id/reject
POST /tasks/:id/reassign
```

## API rules

- Zod validation.
- Consistent error format.
- Tenant isolation.
- Authorization.
- Audit.
- Idempotency where applicable.
