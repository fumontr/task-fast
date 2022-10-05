FROM node:16.17.1-slim as builder
WORKDIR /app

# 頻繁に更新されないファイルを先にCOPYすることでキャッシュがよく効くようにする
COPY package.json yarn.lock ./
RUN yarn --prod --frozen-lockfile

COPY . .

RUN yarn build

FROM gcr.io/distroless/nodejs:16
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

CMD ["./node_modules/.bin/next", "start"]

