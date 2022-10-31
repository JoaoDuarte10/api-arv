CREATE TABLE IF NOT EXISTS users (
    idusers serial PRIMARY KEY NOT NULL,
    name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    phone VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
);