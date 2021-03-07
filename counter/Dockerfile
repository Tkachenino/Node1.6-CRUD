FROM node:alpine

WORKDIR /counter

COPY package.json ./

RUN npm install

COPY . ./

CMD ["node", "index.js"]