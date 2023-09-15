FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .

//envs

RUN yarn run build


CMD ["yarn", "run", "start"]