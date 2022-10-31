CREATE TABLE IF NOT EXISTS segments (
    idsegments serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    name VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers)
);