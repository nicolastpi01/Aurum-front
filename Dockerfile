# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# deps primero para cache
COPY package*.json ./
RUN npm ci

# código + build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine

# Config SPA (fallback a index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
