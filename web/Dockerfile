FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
COPY yarn.lock* ./
RUN yarn --frozen-lockfile;

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

CMD ["yarn", "dev"]