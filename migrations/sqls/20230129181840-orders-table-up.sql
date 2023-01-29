CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products (productid),
    user_id INTEGER NOT NULL REFERENCES users (personid),
    quantity INTEGER NOT NULL,
    status VARCHAR(250) NULL
);