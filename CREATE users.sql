-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id character varying(64) COLLATE pg_catalog."default" NOT NULL,
    name character varying(64) COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying(3) COLLATE pg_catalog."default",
    temp boolean NOT NULL,
    cookie character varying(64) COLLATE pg_catalog."default",
    confirmed boolean,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;