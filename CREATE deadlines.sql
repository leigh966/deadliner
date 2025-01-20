-- Table: public.deadlines

-- DROP TABLE IF EXISTS public.deadlines;

CREATE TABLE IF NOT EXISTS public.deadlines
(
    id serial NOT NULL,
    title character varying(30) COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    start_date date NOT NULL,
    end_date date NOT NULL,
    user_id character varying NOT NULL,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.deadlines
    OWNER to postgres;
-- Index: fki_user_id

-- DROP INDEX IF EXISTS public.fki_user_id;

CREATE INDEX IF NOT EXISTS fki_user_id
    ON public.deadlines USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;