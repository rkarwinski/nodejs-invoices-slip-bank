-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

COMMENT ON SCHEMA public IS 'standard public schema';
-- public.customer definition

-- Drop table

-- DROP TABLE customer;

CREATE TABLE customer (
	tax_id varchar NOT NULL,
	"name" varchar NOT NULL,
	person varchar NOT NULL,
	street varchar NOT NULL,
	"number" varchar NOT NULL,
	complement varchar NULL,
	zipcode varchar NOT NULL,
	district varchar NOT NULL,
	city varchar NOT NULL,
	state varchar NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT customer_un UNIQUE (tax_id)
);


-- public.invoice definition

-- Drop table

-- DROP TABLE invoice;

CREATE TABLE invoice (
	id varchar NOT NULL,
	tax_id varchar NOT NULL,
	ein_id varchar NOT NULL,
	wallet varchar NULL,
	agency varchar NULL,
	account varchar NULL,
	due_date timestamp NOT NULL,
	total float4 NOT NULL,
	interest int4 NOT NULL,
	fine int4 NOT NULL,
	status_id int4 NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	bank int4 NOT NULL,
	CONSTRAINT invoice_pk PRIMARY KEY (id),
	CONSTRAINT invoice_fk FOREIGN KEY (tax_id) REFERENCES customer(tax_id)
);


-- public.slipbank definition

-- Drop table

-- DROP TABLE slipbank;

CREATE TABLE slipbank (
	id varchar NOT NULL,
	invoice_id varchar NOT NULL,
	external_id varchar NOT NULL,
	seunum varchar NOT NULL,
	nossonum varchar NOT NULL,
	barcode varchar NOT NULL,
	digitableline varchar NOT NULL,
	due_date timestamp NOT NULL,
	total float4 NOT NULL,
	status int4 NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT slipbank_pk PRIMARY KEY (id),
	CONSTRAINT slipbank_fk FOREIGN KEY (invoice_id) REFERENCES invoice(id)
);
