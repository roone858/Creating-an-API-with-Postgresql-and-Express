CREATE TABLE IF NOT EXISTS users (
    personid SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);