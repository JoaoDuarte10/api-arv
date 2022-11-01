CREATE TABLE IF NOT EXISTS clients (
    idclients serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NULL,
    phone VARCHAR(256) NULL,
    idsegments int NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers),
    FOREIGN KEY(idsegments) REFERENCES segments(idsegments)
);
