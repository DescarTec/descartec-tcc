FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5006

CMD ["npm", "start", "--", "--port", "5006"]