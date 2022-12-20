FROM node:19.1 AS build-step

WORKDIR /build
COPY package.json ./
RUN npm install

COPY . .
RUN npm run export

FROM nginx:1.18.0
WORKDIR /app
COPY --from=build-step /build/dist/apps/nova88/exported .
EXPOSE 8200