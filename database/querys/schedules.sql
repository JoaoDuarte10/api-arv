CREATE TYPE schedule_status AS ENUM('PENDING', 'FINISHED')

CREATE TABLE IF NOT EXISTS api_arv.schedules (
    idschedules serial PRIMARY KEY,
    idusers int NOT NULL,
    idclients int NULL,
    client_name VARCHAR(100) NULL,
    description VARCHAR(256) NOT NULL,
    time time NOT NULL,
    date date NOT NULL,
    pacote boolean DEFAULT false NOT NULL,
    atendence_count int NULL,
    total_atendence_count int NULL,
    status schedule_status,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers),
    FOREIGN KEY(idclients) REFERENCES api_arv.clients(idclients)
);