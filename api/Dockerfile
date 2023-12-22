FROM node:18

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn db:generate

EXPOSE 3010

CMD ["yarn", "start:dev"]
