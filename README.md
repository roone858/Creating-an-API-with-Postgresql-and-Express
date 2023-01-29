# Storefront Backend Project

## Prepare env
- add a `.env` file in the root directory and set the missing `###` environment parameters
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
POSTGRES_TEST_DB=store_test
POSTGRES_PORT=5432
ENV=dev
BCRYPT_PASSWORD=your-secret-password 
SALT_ROUNDS=10

```

## Set up

- `npm install` to install all dependencies
- `npx db-migrate up` to set up the database  


## Start the app
- `npm run watch` to start the app and get access via http://localhost:3000
