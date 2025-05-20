FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-found

# Copiar todo el proyecto al contenedor
COPY . .

# Copiar las claves necesarias
COPY ./src/keys /app/keys

EXPOSE 8082

CMD ["npm", "run", "start"]