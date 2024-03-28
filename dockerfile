FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --no-audit --no-found

EXPOSE 9393

CMD ["npm", "run", "start"]
