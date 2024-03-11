FROM node:alpine as builder

WORKDIR /client
COPY ./client .
RUN npm install
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder ./client/dist /usr/share/nginx/html