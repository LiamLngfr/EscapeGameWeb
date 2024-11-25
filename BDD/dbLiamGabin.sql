--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-25 21:48:01

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

--
-- TOC entry 2 (class 3079 OID 16401)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5719 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 41062)
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
-- TOC entry 224 (class 1259 OID 41049)
-- Name: joueurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.joueurs (
    id integer NOT NULL,
    pseudo character varying(255) NOT NULL,
    score character varying(9)
);


ALTER TABLE public.joueurs OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41048)
-- Name: joueurs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.joueurs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.joueurs_id_seq OWNER TO postgres;

--
-- TOC entry 5720 (class 0 OID 0)
-- Dependencies: 223
-- Name: joueurs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.joueurs_id_seq OWNED BY public.joueurs.id;


--
-- TOC entry 5553 (class 2604 OID 41052)
-- Name: joueurs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.joueurs ALTER COLUMN id SET DEFAULT nextval('public.joueurs_id_seq'::regclass);


--
-- TOC entry 5713 (class 0 OID 41062)
-- Dependencies: 225
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name, item_to_unlock_id, code_to_unlock, code, previous_item_id, locked, pickable, zoom, chemin_img, taille_icon, geom, dialogue_avant, dialogue_apres) FROM stdin;
1	Pingouin	\N	4731	\N	\N	f	f	7	assets/Image/pingouin.png	64	0101000020E61000002635B401D8C447404051D9B0A6F232C0	Salut à toi, je savais que tu viendrais. \nAvec les ptis gars, on a caché un code dans un pays du monde connu pour ses allures volcaniques pour savoir si tu es digne de \nsuivre cette route : trouve-le et reviens me voir, je te dirais où aller. 	Bien joué, d’après mes infos, le prochain lieu où tu dois aller est la résidence de la Dame de \nFer. Ça a du sens pour toi ? Pour moi absolument aucun ! 
16	CodePingouin	\N	\N	4731	1	f	f	7	assets/Image/volcan.png	192	0101000020E610000039268BFB8FF035C0F4160FEF39095040	Vous remarquez un volcan en activité, puis en plissant les yeux remarquez ce qui s’apparente à des chiffres écrits sur le flanc de la montagne enflammée... 4731	\N
75	DameDeFer	10	\N	\N	1	t	f	10	assets/Image/cuisinier.png	64	0101000020E6100000C30FCEA78E55C0BFC26A2C616DC04940	Salut à toi ! J’ai un service à te demander : je ne supporte plus la cuisine d’ici, je rêve d’un plat de pâtes qui viendrait de la capitale où elles ont été créées.  \nMais si tu sais où c’est ! Un indice : ils ont également inventé la poudre à canon !! \nOn m’a aussi confié un message pour toi, mais je ne m’en souviens pas. J’imagine qu’avec le ventre plein cela pourrait me revenir.	Ah merci ! Je m’attendais à des nouilles mais j’imagine qu’une image de nouille, c’était plus compliqué à détourer… Enfin bref ! Voilà ton message : ton aventure va continuer dans la \ncapitale du pays où la première fusée a décollée dans l'espace. 
10	Pates	\N	\N	\N	75	f	t	5	assets/Image/pates.png	64	0101000020E6100000543A58FFE7185D40D9B27C5D86F54340	\N	\N
58	Fusee	\N	\N	\N	75	t	f	6	assets/Image/fusee.png	96	0101000020E6100000E8BD310400CF4240CA1649BBD1E14B40	Après quelques dizaines de minutes de balade à Moscou, vous vous retrouvez devans une maquette de fusée. En vous approchant, vous remarquez une gravure sous la maquette : on prochain indice se trouvera, là où l’on consomme le plus de coca. 	\N
98	Coca	\N	\N	\N	58	f	f	7	assets/Image/cocac.png	64	0101000020E61000000000000000C958C03DF372D87D6F3340	Après tous ces kilomètres parcourus et le jetlag qui commence à faire effet, vous croyez halluciner : une bouteille de coca qui porte un sombrero vous enjoint à aller dans la capitale des Kangourous. Sans chercher à comprendre ce qu’il se passe, vous repartez sans attendre.	\N
6	Kangourou	\N	\N	\N	98	f	f	9	assets/Image/kangourou.png	64	0101000020E6100000543A58FF67A362403CC093162EA541C0	Après la bouteille, ce kangourou se met à vous parler : tu dois te presser d’aller dans la pays où l’on parle le plus portugais. Sans élaborer, il s’en va d’un saut.	\N
77	Portugais	\N	\N	\N	6	f	f	7	assets/Image/favicon.ico	64	0101000020E61000006E4E250340F347C04BADF71BEDC02FC0	Arrivé au Brésil, tu te sens chahuté. Tu prends le temps de t’arrêter dans un café : alors que tu sirotes un soda, tu réalises que l’établissement dans lequel tu t’es arrêté s’appelle « o falcão prateado ». Tu ne parles pas portugais mais l’enseigne représente un faucon serti d’argent, après cette découverte troublante, tu décides de retourner là où tout a commencé.	\N
99	ENSG	\N	\N	\N	77	f	f	9	assets/Image/ensg.png	64	0101000020E610000047C7D5C8AEB40440CA349A5C8C6B4840	De retour sur la parcelle Y, tu t’aperçois que tous les membres des Ensgagés t’attendaient. Alors que tu t’apprêtes à les saluer joyeusement ils se mettent à te sermonner, et ils ont raison : ton empreinte carbone est absolument scandaleuse ! Alors qu’ils commençaient à te tabasser, tu sens ta conscience s’éloigner peu à peu : tu te fais réveiller par tes camarades, tu t’étais endormi dans l’herbe en tenant un journal détrempé qui annonçait la découverte de la chouette d’or. Tu décides alors de ne plus jamais toucher à l’alcool, ou au moins jusque jeudi prochain. 	\N
3	FauxPingouin	\N	\N	\N	\N	f	f	5		64	0101000020E61000009A999999997956400000000000000000	Arrivé sur place tu croise des scientifique et les questionnent sur l'indice que tu as. Alors le scientifique te répond: Ce n'est pas le type de pingouin que tu cherche, essaye plutôt d'aller faire un tour vers Madagascar...	\N
\.


--
-- TOC entry 5712 (class 0 OID 41049)
-- Dependencies: 224
-- Data for Name: joueurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.joueurs (id, pseudo, score) FROM stdin;
1	Max Verstappen	01:11.365
2	Snoop	04:20
3	Usain Bolt	00:09.58
\.


--
-- TOC entry 5552 (class 0 OID 16723)
-- Dependencies: 219
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5721 (class 0 OID 0)
-- Dependencies: 223
-- Name: joueurs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.joueurs_id_seq', 3, true);


--
-- TOC entry 5560 (class 2606 OID 41068)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- TOC entry 5558 (class 2606 OID 41054)
-- Name: joueurs joueurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.joueurs
    ADD CONSTRAINT joueurs_pkey PRIMARY KEY (id);


-- Completed on 2024-11-25 21:48:02

--
-- PostgreSQL database dump complete
--

