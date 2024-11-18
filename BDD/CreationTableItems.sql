-- Table: public.items

DROP TABLE IF EXISTS public.items;

CREATE TABLE IF NOT EXISTS public.items
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default",
    item_to_unlock_id integer,
    code_to_unlock integer,
    code integer,
    previous_item_id integer,
    pickable boolean,
	geom GEOMETRY(Point, 4326),
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;
	

DELETE FROM items;

INSERT INTO items VALUES (1, 'Pingouin', null, 1234, null, null, false, ST_SetSRID(ST_MakePoint(47.537842,-18.947856 ),4326));
INSERT INTO items VALUES (16, 'CodePingouin', null, null, 1234, 1, false, ST_SetSRID(ST_MakePoint(-21.939697,64.144161 ), 4326));
INSERT INTO items VALUES (75, 'DameDeFer', null, null, null, 16, true, ST_SetSRID(ST_MakePoint(-0.127611,51.503338 ), 4326));
INSERT INTO items VALUES (10, 'Pates', null, null, null, 16, false, ST_SetSRID(ST_MakePoint(116.38916,39.918163 ), 4326));
INSERT INTO items VALUES (58, 'Fusee', null, null, null, 10, false, ST_SetSRID(ST_MakePoint(37.617188,55.764213 ), 4326));
INSERT INTO items VALUES (98, 'Coca', null, null, null, 58, false, ST_SetSRID(ST_MakePoint(-99.140625,19.435514 ), 4326));
INSERT INTO items VALUES (6, 'Kangourou', null, null, null, 98, false, ST_SetSRID(ST_MakePoint(149.106445,-35.290469 ), 4326));
INSERT INTO items VALUES (77, 'Portugais', null, null, null, 6, false, ST_SetSRID(ST_MakePoint(-47.900391,-15.876809 ), 4326));

