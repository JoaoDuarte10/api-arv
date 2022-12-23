CREATE TABLE IF NOT EXISTS api_arv.clients (
    idclients serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NULL,
    phone VARCHAR(256) NULL,
    idsegments int NULL,
    address VARCHAR(256) NULL,
    address_number INT NULL,
    note VARCHAR(512) NULL,
    deleted BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers),
    FOREIGN KEY(idsegments) REFERENCES api_arv.segments(idsegments)
);
