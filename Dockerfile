FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN npm install

COPY . .
 
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]