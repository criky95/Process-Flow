FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@11.23.0

COPY package.json pnpm-workspace.yaml turbo.json pnpm-lock.yaml .npmrc ./
COPY packages/database ./packages/database
COPY apps/api ./apps/api

RUN pnpm install
RUN pnpm --filter @processflow/db db:generate
RUN pnpm --filter @processflow/db build
RUN pnpm --filter @processflow/api build

FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm@11.23.0

COPY --from=builder /app ./

EXPOSE 3001
CMD ["node", "apps/api/dist/main"]
