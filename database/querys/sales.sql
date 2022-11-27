create type sales_status as enum ('PAID', 'PENDING')

create table if not exists api_arv.sales(
    idsales serial primary key not null,
    idusers int not null,
    idclients int null,
    description varchar(256) not null,
    date date not null,
    total numeric not null,
    payment_status sales_status not null, 
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers),
    FOREIGN KEY(idclients) REFERENCES api_arv.clients(idclients)
);