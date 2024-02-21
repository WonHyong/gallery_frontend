FROM node:20

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

CMD ["npm", "run", "dev"]