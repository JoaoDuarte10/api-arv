CREATE TABLE IF NOT EXISTS api_arv.segments (
    idsegments serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    name VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers)
    ON DELETE SET NULL
);


-- https://linuxhint.com/postgres-delete-cascade/
-- validar esse site para colocar um cascade