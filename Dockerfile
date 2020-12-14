FROM node:14.15.1-alpine3.10

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3002

CMD npm run react-dev && npm run docker