-- Table: public.joueurs

DROP TABLE IF EXISTS public.joueurs;

CREATE TABLE IF NOT EXISTS public.joueurs
(
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(255) NOT NULL,
    score VARCHAR(5)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.joueurs
    OWNER to postgres;

DELETE FROM joueurs;

INSERT INTO joueurs (pseudo,score) VALUES ('Max Verstappen', '01:11');
INSERT INTO joueurs (pseudo,score) VALUES ('Snoop', '04:20');
INSERT INTO joueurs (pseudo,score) VALUES ('Usain Bolt', '00:09');