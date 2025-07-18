# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /repo
COPY . .
RUN npm ci
WORKDIR /repo/apps/frontend
RUN npm run build

# Stage 2: Serve the app with a static server
FROM nginx:alpine
COPY --from=builder /repo/apps/frontend/dist /usr/share/nginx/html
COPY --from=builder /repo/apps/frontend/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 