# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `/products` [GET]
- Create `/products/create` [POST] [token required]
- Show `/products/:id` [GET]
- Delete `/products/:id` [DELETE] [token required]


#### Users
- Index `/users` [GET] [token required]
- Create `/users/create` [POST] [token required]
- Show `/users/:id` [GET] [token required]
- Login `/users/Login` [POST] [To get token]
- Delete `/users/:id` [DELETE] [token required]

#### Orders
- Index `/orders` [GET] [token required]
- Create `/orders/create` [POST] [token required]
- Show `/orders/:id` [GET] [token required]
- Delete `/orders/:id` [DELETE] [token required]



## Data Shapes
#### Product
- productId `SERIAL PRIMARY KEY`
- title `VARCHAR(250)`
- price `INTEGER`
- category `VARCHAR(250)`

#### User
- personId `SERIAL PRIMARY KEY`
- userName `VARCHAR(250)`
- firstName `VARCHAR(250)`
- lastName `VARCHAR(250)`
- email `VARCHAR(250)`
- password `VARCHAR(250)`

#### Orders
- id `SERIAL PRIMARY KEY`
- product_id `INTEGER NOT NULL REFERENCES products (productid)`
- user_id `INTEGER NOT NULL REFERENCES users (personid)`
- quantity `INTEGER NOT NULL`
- status VARCHAR(250) `NOT NULL`

#### Order_products
- order_id `INTEGER NOT NULL REFERENCES orders (id)`
- product_id `INTEGER NOT NULL REFERENCES products (productid)`
- quantity `INTEGER NOT NULL`
