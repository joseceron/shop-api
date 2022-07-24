create extension if not exists "uuid-ossp"

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null check (title <> ''),
	description text,
	price numeric not null
);

create table stocks (
	product_id uuid not null primary key,
	count integer not null,
	foreign key (product_id) references products(id)
); 

insert into products (title, description, price) values ('Laptop', 'MACBook pro 13', 1500.00);
insert into products (title, description, price) values ('Mouse green', 'Generic mouse', 50.20);

insert into stocks (product_id, count) values ('f819735a-7a48-492c-9024-351f799d5f0e', 20);
insert into stocks (product_id, count) values ('e59051c2-3720-488d-ac4a-1d673bc09713', 31);

