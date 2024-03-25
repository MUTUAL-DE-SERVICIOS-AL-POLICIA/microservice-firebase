FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9393

ARG PORT
ENV PORT=$PORT

CMD ["npm", "run", "start"]
