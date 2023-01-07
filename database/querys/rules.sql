CREATE TABLE IF NOT EXISTS api_arv.rules (
    idrules SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(300) NULL,
    has_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS api_arv.user_rules (
    iduser_rules SERIAL PRIMARY KEY,
    idrules INT,
    idusers INT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (idrules) REFERENCES api_arv.rules(idrules),
    FOREIGN KEY (idusers) REFERENCES api_arv.users(idusers)
);