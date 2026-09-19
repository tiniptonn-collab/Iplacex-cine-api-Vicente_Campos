# Stage 1: instalación de dependencias
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: ejecución de la API
FROM node:22

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "server.js"]