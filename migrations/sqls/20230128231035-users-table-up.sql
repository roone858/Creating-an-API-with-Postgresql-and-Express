CREATE TABLE products (
    productid SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE users (
    personid SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products (productid),
    user_id INTEGER NOT NULL REFERENCES users (personid),
    quantity INTEGER NOT NULL,
    status VARCHAR(250) NULL
);