FROM node:latest

WORKDIR /app

RUN npm install vite
COPY src src
COPY assets assets
COPY vite.config.js .
COPY index.html .
COPY package.json .
COPY package-lock.json .
COPY babel.config.json .
RUN mkdir dist
RUN npm ci
RUN npm run build
EXPOSE 5173

CMD npx vite --host
