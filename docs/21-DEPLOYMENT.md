# Deployment

## Development

Docker Compose:

- PostgreSQL
- Redis
- MinIO

## Production

- web
- api
- worker
- PostgreSQL managed o dedicado
- Redis
- S3-compatible storage

## Configuration

Variables mediante environment.

Nunca commitear secrets.

## Migrations

Prisma migrations.

No utilizar `db push` como mecanismo normal de producción.
