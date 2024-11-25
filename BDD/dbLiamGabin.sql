--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-25 22:34:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 41148)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name text,
    item_to_unlock_id integer,
    code_to_unlock integer,
    code integer,
    previous_item_id integer,
    locked boolean,
    pickable boolean,
    zoom integer,
    chemin_img character varying(255),
    taille_icon integer,
    geom public.geometry(Point,4326),
    dialogue_avant text,
    dialogue_apres text
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 5702 (class 0 OID 41148)
-- Dependencies: 225
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name, item_to_unlock_id, code_to_unlock, code, previous_item_id, locked, pickable, zoom, chemin_img, taille_icon, geom, dialogue_avant, dialogue_apres) FROM stdin;
1	Pingouin	\N	4731	\N	\N	f	f	7	assets/Image/pingouin.png	64	0101000020E61000002635B401D8C447404051D9B0A6F232C0	\N	Bien joué, d’après mes infos, le prochain lieu où tu dois aller est la résidence de la Dame de \nFer. Ça a du sens pour toi ? Pour moi absolument aucun ! 
16	CodePingouin	\N	\N	4731	1	f	f	7	assets/Image/volcan.png	192	0101000020E610000039268BFB8FF035C0F4160FEF39095040	Vous remarquez un volcan en activité, puis en plissant les yeux remarquez ce qui s’apparente à des chiffres écrits sur le flanc de la montagne enflammée... 4731	\N
75	DameDeFer	10	\N	\N	1	t	f	10	assets/Image/cuisinier.png	64	0101000020E6100000C30FCEA78E55C0BFC26A2C616DC04940	Salut à toi ! J’ai un service à te demander : je ne supporte plus la cuisine d’ici, je rêve d’un plat de pâtes qui viendrait de la capitale où elles ont été créées.  \nMais si tu sais où c’est ! Un indice : ils ont également inventé la poudre à canon !! \nOn m’a aussi confié un message pour toi, mais je ne m’en souviens pas. J’imagine qu’avec le ventre plein cela pourrait me revenir.	Ah merci ! Je m’attendais à des nouilles mais j’imagine qu’une image de nouille, c’était plus compliqué à détourer… Enfin bref ! Voilà ton message : ton aventure va continuer dans la \ncapitale du pays où la première fusée a décollée dans l'espace. 
10	Pates	\N	\N	\N	75	f	t	5	assets/Image/pates.png	64	0101000020E6100000543A58FFE7185D40D9B27C5D86F54340	\N	\N
58	Fusee	\N	\N	\N	75	t	f	6	assets/Image/fusee.png	96	0101000020E6100000E8BD310400CF4240CA1649BBD1E14B40	Après quelques dizaines de minutes de balade à Moscou, vous vous retrouvez devans une maquette de fusée. En vous approchant, vous remarquez une gravure sous la maquette : on prochain indice se trouvera, là où l’on consomme le plus de coca. 	\N
98	Coca	\N	\N	\N	58	f	f	7	assets/Image/cocac.png	64	0101000020E61000000000000000C958C03DF372D87D6F3340	Après tous ces kilomètres parcourus et le jetlag qui commence à faire effet, vous croyez halluciner : une bouteille de coca qui porte un sombrero vous enjoint à aller dans la capitale des Kangourous. Sans chercher à comprendre ce qu’il se passe, vous repartez sans attendre.	\N
6	Kangourou	\N	\N	\N	98	f	f	9	assets/Image/kangourou.png	64	0101000020E6100000543A58FF67A362403CC093162EA541C0	Après la bouteille, ce kangourou se met à vous parler : tu dois te presser d’aller dans la pays où l’on parle le plus portugais. Sans élaborer, il s’en va d’un saut.	\N
77	Portugais	\N	\N	\N	6	f	f	7	assets/Image/favicon.ico	64	0101000020E61000006E4E250340F347C04BADF71BEDC02FC0	Arrivé au Brésil, tu te sens chahuté. Tu prends le temps de t’arrêter dans un café : alors que tu sirotes un soda, tu réalises que l’établissement dans lequel tu t’es arrêté s’appelle « o falcão prateado ». Tu ne parles pas portugais mais l’enseigne représente un faucon serti d’argent, après cette découverte troublante, tu décides de retourner là où tout a commencé.	\N
99	ENSG	\N	\N	\N	77	f	f	9	assets/Image/ensg.png	64	0101000020E610000047C7D5C8AEB40440CA349A5C8C6B4840	De retour sur la parcelle Y, tu t’aperçois que tous les membres des Ensgagés t’attendaient. Alors que tu t’apprêtes à les saluer joyeusement ils se mettent à te sermonner, et ils ont raison : ton empreinte carbone est absolument scandaleuse ! Alors qu’ils commençaient à te tabasser, tu sens ta conscience s’éloigner peu à peu : tu te fais réveiller par tes camarades, tu t’étais endormi dans l’herbe en tenant un journal détrempé qui annonçait la découverte de la chouette d’or. Tu décides alors de ne plus jamais toucher à l’alcool, ou au moins jusque jeudi prochain. 	\N
3	Pingouin_bis	\N	\N	\N	\N	f	f	5	assets/Image/pingouin_bis.png	64	0101000020E6100000BD378600E07444C0CFF8BEB854335440	Arrivé sur place tu croise des scientifique et les questionne sur l'indice que tu as. Alors le scientifique te répond: "Ce n'est pas le type de pingouin que tu cherche, essaye plutôt d'aller faire un tour vers Madagascar..."	\N
\.


--
-- TOC entry 5551 (class 2606 OID 41154)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


-- Completed on 2024-11-25 22:34:24

--
-- PostgreSQL database dump complete
--

