FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@11.23.0

COPY package.json pnpm-workspace.yaml turbo.json pnpm-lock.yaml .npmrc ./
COPY apps/web ./apps/web

RUN pnpm install
RUN pnpm --filter @processflow/web build

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
