create type outgoing_payment_method_type as enum('CREDIT_CARD', 'CASH', 'PIX', 'BILLET');

create table if not exists api_arv.outgoing(
    idoutgoing serial primary key not null,
    idusers int not null,
    description varchar(256) not null,
    date date not null,
    total numeric not null,
    payment_method outgoing_payment_method_type not null,
    installment boolean DEFAULT false NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers)
);