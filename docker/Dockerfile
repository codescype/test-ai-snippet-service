# Stage 1: Build the application
FROM node:22.17.1-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@10.10.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json apps/client/
COPY apps/server/package.json apps/server/
COPY libs/shared/package.json libs/shared/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm nx run-many --targets=build --projects=server,client

# Stage 2: Run the application
FROM node:22.17.1-alpine
WORKDIR /app

RUN npm install -g pnpm@10.10.0

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/client/package.json /app/apps/client/project.json apps/client/
COPY --from=builder /app/apps/server/package.json /app/apps/server/project.json apps/server/
COPY --from=builder /app/libs/shared/package.json /app/libs/shared/project.json libs/shared/
COPY --from=builder /app/nx.json ./
COPY --from=builder /app/apps/client/dist apps/client/dist
COPY --from=builder /app/apps/server/dist apps/server/dist
COPY --from=builder /app/libs/shared/dist libs/shared/dist
COPY --from=builder /app/apps/client/app apps/client/app
COPY --from=builder /app/apps/server/src apps/server/src
COPY --from=builder /app/libs/shared/src libs/shared/src
COPY --from=builder /app/vitest.workspace.ts /app/tsconfig.json /app/tsconfig.base.json ./
COPY --from=builder /app/apps/client/vite.config.ts /app/apps/client/tsconfig.json /app/apps/client/tsconfig.app.json /app/apps/client/tsconfig.spec.json apps/client/
COPY --from=builder /app/apps/server/vite.config.ts /app/apps/server/tsconfig.json /app/apps/server/tsconfig.app.json /app/apps/server/tsconfig.spec.json apps/server/
COPY --from=builder /app/libs/shared/vite.config.ts /app/libs/shared/tsconfig.json /app/libs/shared/tsconfig.lib.json /app/libs/shared/tsconfig.spec.json libs/shared/
RUN pnpm install --frozen-lockfile

EXPOSE 3000 3030

USER appuser

# Commands
CMD ["sh", "-c", "echo 'Run with docker-compose for tests and start'"]