create table if not exists sales(
    idsales serial primary key not null,
    idusers int not null,
    idclients int null,
    description varchar(256) not null,
    date date not null,
    price int not null,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers),
    FOREIGN KEY(idclients) REFERENCES clients(idclients)
);