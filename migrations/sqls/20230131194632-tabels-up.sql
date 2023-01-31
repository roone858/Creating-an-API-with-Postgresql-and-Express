CREATE TABLE IF NOT EXISTS users (
    personid SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
    productid SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    price INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (personid),
    status VARCHAR(250) NOT NULL
);
CREATE TABLE IF NOT EXISTS order_products (
    order_id INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (productid),
    quantity INTEGER NOT NULL
);