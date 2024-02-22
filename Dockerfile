FROM node:alpine as builder

RUN mkdir /client
WORKDIR /client

COPY ./client/package.json /client/package.json
RUN npm install

COPY ./client .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /client/dist /usr/share/nginx/html