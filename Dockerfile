FROM node:16.16.0-alpine3.15

RUN yarn install

CMD ["yarn", "ts-node", "main.ts"]
