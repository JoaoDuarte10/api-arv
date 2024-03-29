FROM node:16-alpine AS build
WORKDIR /usr/app/arv
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/app/arv
ENV NODE_ENV=production
ENV PORT=${PORT}
COPY package*.json ./
RUN apk add bash && \
    apk add nano && \
    apk add dumb-init && \
    npm ci --only=production && \
    mkdir logs
USER node
COPY --chown=node:node --from=build /usr/app/arv/dist .
CMD ["dumb-init", "node", "src/main.js"]
EXPOSE ${PORT}
