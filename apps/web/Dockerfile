FROM node:22-bookworm-slim

RUN npm install -g pnpm@10.33.0

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN pnpm install --frozen-lockfile --filter @pori/web...

COPY packages/shared packages/shared
COPY apps/web apps/web

ARG NEXT_PUBLIC_API_URL=https://165-99-219-120.sslip.io/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm --filter @pori/shared build \
  && pnpm --filter @pori/web build

WORKDIR /workspace/apps/web

EXPOSE 3000

CMD ["pnpm", "start"]
