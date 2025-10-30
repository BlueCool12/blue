# syntax=docker/dockerfile:1.6

# -------- Builder --------
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_OPTIONS=--dns-result-order=ipv4first
RUN apk add --no-cache ca-certificates libc6-compat && update-ca-certificates

# deps
COPY package*.json ./
RUN --mount=type=cache,id=npm-cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# src
COPY . .

# 빌드 타임용 환경변수 getApiBase()
ARG PREFER_PUBLIC_API=0
ENV PREFER_PUBLIC_API=${PREFER_PUBLIC_API}

ARG INTERNAL_API_BASE_URL
ENV INTERNAL_API_BASE_URL=${INTERNAL_API_BASE_URL}

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

ARG PUBLIC_API_BASE_URL
ENV PUBLIC_API_BASE_URL=${PUBLIC_API_BASE_URL}

RUN npm run build

# -------- Runtime (초슬림) --------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production NODE_OPTIONS=--dns-result-order=ipv4first PORT=8897
RUN apk add --no-cache ca-certificates libc6-compat && update-ca-certificates

# standalone 산출물만 복사
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public

USER node

EXPOSE 8897
CMD ["node", "server.js"]
