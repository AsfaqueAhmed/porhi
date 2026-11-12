FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && npm install -g pnpm@10.33.0

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN pnpm install --frozen-lockfile --filter @pori/api...

COPY packages/shared packages/shared
COPY apps/api apps/api

RUN pnpm --filter @pori/shared build \
  && DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" pnpm --filter @pori/api build

WORKDIR /workspace/apps/api

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/src/main.js"]
