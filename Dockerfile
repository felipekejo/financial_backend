FROM node:18-alpine3.19 AS build

WORKDIR /usr/src/app

COPY package*.json .npmrc ./

RUN npm install

COPY . .
 
RUN npm run build

FROM node:18-alpine3.19 as deploy

WORKDIR /usr/src/app

RUN npm install prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

RUN npx prisma migrate deploy

EXPOSE 3333

CMD ["npm", "run", "start"]