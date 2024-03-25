FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9393

CMD ["npm", "run", "start"]