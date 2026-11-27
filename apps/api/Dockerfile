FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
RUN npm install
COPY tsconfig.base.json ./
COPY apps/api ./apps/api
RUN npm run build --workspace @voltsphere/api

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/
RUN npm install --omit=dev
COPY --from=build /app/apps/api/dist ./apps/api/dist
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@voltsphere/api"]
