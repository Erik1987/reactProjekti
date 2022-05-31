CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    description VARCHAR(255)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY, 
    email VARCHAR(255),
    password VARCHAR(255)
);