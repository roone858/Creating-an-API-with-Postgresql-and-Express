CREATE TABLE IF NOT EXISTS order_products (
    order_id INTEGER NOT NULL REFERENCES orders (id),
    product_id INTEGER NOT NULL REFERENCES products (productid),
    quantity INTEGER NOT NULL
);