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
    dialogue_avant text,
    dialogue_apres text,
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;
	

DELETE FROM items;

INSERT INTO items VALUES (1, 'Pingouin', null, 4731, null, null, false, false, 7, 'assets/Image/pingouin.png', 64, ST_SetSRID(ST_MakePoint(47.537842,-18.947856 ), 4326), 'Salut à toi, je savais que tu viendrais. 
Avec les ptis gars, on a caché un code dans un pays du monde connu pour ses allures volcaniques pour savoir si tu es digne de 
suivre cette route : trouve-le et reviens me voir, je te dirais où aller. ', 'Bien joué, d’après mes infos, le prochain lieu où tu dois aller est la résidence de la Dame de 
Fer. Ça a du sens pour toi ? Pour moi absolument aucun ! ');
INSERT INTO items VALUES (16, 'CodePingouin', null, null, 4731, 1, false, false, 7, 'assets/Image/volcan.png', 192, ST_SetSRID(ST_MakePoint(-21.939697,64.144161 ), 4326), 'Vous remarquez un volcan en activité, puis en plissant les yeux remarquez ce qui s’apparente à des chiffres écrits sur le flanc de la montagne enflammée... 4731', null);
INSERT INTO items VALUES (75, 'DameDeFer', 10, null, null, 1, true, false, 10, 'assets/Image/cuisinier.png', 64, ST_SetSRID(ST_MakePoint(-0.127611,51.503338 ), 4326), 'Salut à toi ! J’ai un service à te demander : je ne supporte plus la cuisine d’ici, je rêve d’un plat de pâtes qui viendrait de la capitale où elles ont été créées.  
Mais si tu sais où c’est ! Un indice : ils ont également inventé la poudre à canon !! 
On m’a aussi confié un message pour toi, mais je ne m’en souviens pas. J’imagine qu’avec le ventre plein cela pourrait me revenir.', 'Ah merci ! Je m’attendais à des nouilles mais j’imagine qu’une image de nouille, c’était plus compliqué à détourer… Enfin bref ! Voilà ton message : ton aventure va continuer dans la 
capitale du pays où la première fusée a décollée dans l''espace. ');
INSERT INTO items VALUES (10, 'Pates', null, null, null, 75, false, true, 5, 'assets/Image/pates.png', 64, ST_SetSRID(ST_MakePoint(116.38916,39.918163 ), 4326), null, null);
INSERT INTO items VALUES (58, 'Fusee', null, null, null, 75, true, false, 6, 'assets/Image/fusee.png', 96, ST_SetSRID(ST_MakePoint(37.617188,55.764213 ), 4326), 'Après quelques dizaines de minutes de balade à Moscou, vous vous retrouvez devans une maquette de fusée. En vous approchant, vous remarquez une gravure sous la maquette : on prochain indice se trouvera, là où l’on consomme le plus de coca. ', null);
INSERT INTO items VALUES (98, 'Coca', null, null, null, 58, false, false, 7, 'assets/Image/cocac.png', 64, ST_SetSRID(ST_MakePoint(-99.140625,19.435514 ), 4326), 'Après tous ces kilomètres parcourus et le jetlag qui commence à faire effet, vous croyez halluciner : une bouteille de coca qui porte un sombrero vous enjoint à aller dans la capitale des Kangourous. Sans chercher à comprendre ce qu’il se passe, vous repartez sans attendre.', null);
INSERT INTO items VALUES (6, 'Kangourou', null, null, null, 98, false, false, 9, 'assets/Image/kangourou.png', 64, ST_SetSRID(ST_MakePoint(149.106445,-35.290469 ), 4326), 'Après la bouteille, ce kangourou se met à vous parler : tu dois te presser d’aller dans la pays où l’on parle le plus portugais. Sans élaborer, il s’en va d’un saut.' , null);
INSERT INTO items VALUES (77, 'Portugais', null, null, null, 6, false, false, 7, 'assets/Image/favicon.ico', 64, ST_SetSRID(ST_MakePoint(-47.900391,-15.876809 ), 4326), 'Arrivé au Brésil, tu te sens chahuté. Tu prends le temps de t’arrêter dans un café : alors que tu sirotes un soda, tu réalises que l’établissement dans lequel tu t’es arrêté s’appelle « o falcão prateado ». Tu ne parles pas portugais mais l’enseigne représente un faucon serti d’argent, après cette découverte troublante, tu décides de retourner là où tout a commencé.', null);
INSERT INTO items VALUES (99, 'ENSG', null, null, null, 77, false, false, 9, 'assets/Image/ensg.png', 64, ST_SetSRID(ST_MakePoint(2.588224, 48.840221), 4326), 'De retour sur la parcelle Y, tu t’aperçois que tous les membres des Ensgagés t’attendaient. Alors que tu t’apprêtes à les saluer joyeusement ils se mettent à te sermonner, et ils ont raison : ton empreinte carbone est absolument scandaleuse ! Alors qu’ils commençaient à te tabasser, tu sens ta conscience s’éloigner peu à peu : tu te fais réveiller par tes camarades, tu t’étais endormi dans l’herbe en tenant un journal détrempé qui annonçait la découverte de la chouette d’or. Tu décides alors de ne plus jamais toucher à l’alcool, ou au moins jusque jeudi prochain. ', null);
INSERT INTO items VALUES (3, 'Pingouin_bis', null, null, null, null, false, false, 5, 'assets/Image/pingouin_bis.png', 64, ST_SetSRID(ST_MakePoint(89.9, 0.0), 4326), 'Arrivé sur place tu croise des scientifique et les questionne sur l''indice que tu as. Alors le scientifique te répond: Ce n''est pas le type de pingouin que tu cherche, essaye plutôt d''aller faire un tour vers Madagascar...')
