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
	locked boolean,
    pickable boolean,
    zoom integer,
	chemin_img VARCHAR(255),
	taille_icon integer,
	geom GEOMETRY(Point, 4326),
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;
	

DELETE FROM items;

INSERT INTO items VALUES (1, 'Pingouin', null, 4731, null, null, false, false, 7, 'assets/Image/pingouin.png', 64, ST_SetSRID(ST_MakePoint(47.537842,-18.947856 ), 4326));
INSERT INTO items VALUES (16, 'CodePingouin', null, null, 4731, 1, false, false, 7, 'assets/Image/volcan.png', 192, ST_SetSRID(ST_MakePoint(-21.939697,64.144161 ), 4326));
INSERT INTO items VALUES (75, 'DameDeFer', 10, null, null, 1, true, false, 10, 'assets/Image/cuisinier.png', 64, ST_SetSRID(ST_MakePoint(-0.127611,51.503338 ), 4326));
INSERT INTO items VALUES (10, 'Pates', null, null, null, 1, true, true, 5, 'assets/Image/pates.png', 64, ST_SetSRID(ST_MakePoint(116.38916,39.918163 ), 4326));
INSERT INTO items VALUES (58, 'Fusee', null, null, null, 75, true, false, 6, 'assets/Image/fusee.png', 96, ST_SetSRID(ST_MakePoint(37.617188,55.764213 ), 4326));
INSERT INTO items VALUES (98, 'Coca', null, null, null, 58, false, false, 7, 'assets/Image/cocac.png', 64, ST_SetSRID(ST_MakePoint(-99.140625,19.435514 ), 4326));
INSERT INTO items VALUES (6, 'Kangourou', null, null, null, 98, false, false, 9, 'assets/Image/kangourou.png', 64, ST_SetSRID(ST_MakePoint(149.106445,-35.290469 ), 4326));
INSERT INTO items VALUES (77, 'Portugais', null, null, null, 6, false, false, 7, 'assets/Image/favicon.ico', 64, ST_SetSRID(ST_MakePoint(-47.900391,-15.876809 ), 4326));
INSERT INTO items VALUES (99, 'ENSG', null, null, null, 77, false, false, 9, 'assets/Image/ensg.png', 64, ST_SetSRID(ST_MakePoint(2.588224, 48.840221), 4326));

