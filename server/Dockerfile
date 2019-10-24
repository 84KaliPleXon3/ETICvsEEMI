FROM node:8

WORKDIR /api

COPY ./package-lock.json .
COPY ./package.json .
COPY ./server ./server

# Build
RUN npm install --prefix /api

EXPOSE 3000