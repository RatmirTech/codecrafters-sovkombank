CREATE TABLE public.users(
    user_id uuid PRIMARY KEY,
    password varchar(255) NOT NULL ,
    phone_number varchar(30) UNIQUE NOT NULL,
    email varchar(255) UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    middle_name varchar(255)
);

create table public.currencies(
    id uuid PRIMARY KEY,
    name varchar(50) not null UNIQUE,
    code varchar(3) UNIQUE NOT NULL
);

create table public.bank_accounts(
    account_id uuid PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(user_id),
    currency_id uuid NOT NULL REFERENCES currencies(id),
    account_number varchar(23) UNIQUE NOT NULL ,
    balance decimal(15, 2) NOT NULL
);

create table public.documents(
                                documents_id uuid PRIMARY KEY,
                                 user_id uuid REFERENCES users(user_id) on delete cascade,
                                 registration_address text NOT NULL,
                                 passport_details varchar(10) NOT NULL UNIQUE,
                                 passport_issued_at date NOT NULL,
                                 inn varchar(12) NOT NULL UNIQUE ,
                                 snils varchar(15) NOT NULL UNIQUE ,
                                 place_of_birth text NOT NULL,
                                 date_of_birth date not null
);

INSERT INTO public.currencies (id, name, code) VALUES
('a0e12f8a-1ee5-4b17-80b9-ba3bb38ca1f0', 'Рубль', 'RUB'),
('b2d23f1e-3d5e-4c5e-842e-1e3d17c9c7a7', 'Дирхам', 'AED'),
('c3e34f3d-4d6f-4e6f-962f-2e4e18c9e8f8', 'Юань', 'CNY');