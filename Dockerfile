# Dockerfile adapted from https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
# Set node version
ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files
COPY package.json package-lock.json* ./

# Install project dependencies
RUN npm ci --no-audit --no-fund

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================
FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application soure code
COPY . .

# Environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build app
RUN npm run build

# ============================================
# Stage 3: Run Next.js application
# ============================================
FROM node:${NODE_VERSION} AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$ARG

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy production assets
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for the prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Switch to non-root user for security best practices
USER node

# Export port 3000 to allow HTTP traffic
EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]