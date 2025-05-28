# Étape 1 : Build de l'app avec Node.js (Debian)
FROM node:20-bookworm AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx (Debian) pour les fichiers statiques
FROM nginx:1.26-bookworm

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

