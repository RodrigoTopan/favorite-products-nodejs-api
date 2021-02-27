FROM node:12-alpine

WORKDIR /src

ADD . /src

RUN npm install
RUN npm run build

CMD npm start

EXPOSE 8080
