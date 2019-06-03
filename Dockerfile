FROM node:10.16-stretch-slim

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install

COPY . /app

RUN npm run build

ENTRYPOINT ["node", "server.js"]
CMD [""]
