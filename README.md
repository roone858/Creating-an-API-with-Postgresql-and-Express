# Storefront Backend Project

## Prepare env
- add a `.ENV` file in the root directory and set the missing `###` environment parameters
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
### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

### Create Databases
- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the  database
    - `CREATE DATABASE store;`
- Connect to the databases and grant all privileges
    - `\c store`
    
### Migrate Database
Navigate to the root directory and run the command below to migrate the database 
`npx db-migrate up`


## Set up
- `npm install` to install all dependencies
  

## Start the app
- `npm run watch` to start the app and get access via http://localhost:3000

## API Endpoints
get access via http://localhost:3000
#### Products
- Index `/products` [GET]
- Create `/products/create` [POST] [token required]
- Show `/products/:id` [GET]
- Delete `/products/:id` [DELETE] [token required]


#### Users
- Index `/users` [GET] [token required]
- Create `/users/` [POST] [token required]
- Show `/users/:id` [GET] [token required]
- Login `/users/login` [POST] [To get token]
- Delete `/users/:id` [DELETE] [token required]

#### Orders
- Index `/orders` [GET] [token required]
- Create `/orders/` [POST] [token required]
- Show `/orders/:id` [GET] [token required]
- Delete `/orders/:id` [DELETE] [token required]

