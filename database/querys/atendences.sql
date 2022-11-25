CREATE TABLE IF NOT EXISTS api_arv.atendences (
    idatendences serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    idclients int NULL,
    description VARCHAR(256) NOT NULL,
    date date NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers),
    FOREIGN KEY(idclients) REFERENCES api_arv.clients(idclients)
);