# Node runs the TypeScript sources directly (native type stripping), so there is no build stage.
FROM node:26-slim AS base
RUN npm install --global pnpm@12.23.0 turbo@2.11.13
WORKDIR /app

# Keep only the bot and the workspace packages it depends on.
FROM base AS pruner
COPY . .
RUN turbo prune bot --docker

FROM base AS runner
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .

ENV NODE_ENV=production
USER node
WORKDIR /app/apps/bot
CMD ["node", "src/index.ts"]
