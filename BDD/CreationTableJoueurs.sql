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

DELETE FROM joueurs; --J'ai copié ton truc pour items, mais pas sûr que cette ligne soit vraiment utile