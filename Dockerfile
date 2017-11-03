FROM node:8.8

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]