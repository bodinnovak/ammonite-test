# Ammonite playlist backend

## Installation

```bash
$ yarn install
```

## Database Migration

Run postgres server, and put credentials to `.env` file

```bash
# create a init migration  if you made any change for database you should need to run given below 2 commands before yarn run start
$ yarn run typeorm:migration:generate -- my_init

# Run a migration
yarn run typeorm:migration:run

# add seed data
$ yarn run seed
```

## Running the app

```bash

# development
$ yarn run dev

# production mode
$ yarn run start:prod
```



## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
