## Description

Api responsável por toda aplicação do arv controll.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:coverage
```

## Build

```bash
# App build
$ npm run build

# Docker build
$ npm run docker:build
```

## Renovar Certificados Let's Encrypt

No container do nginx:

```sh
cd /etc/letsencrypt
certbot renew
```