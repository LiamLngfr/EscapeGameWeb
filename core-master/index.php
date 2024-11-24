<?php
require 'flight/Flight.php';


//              Connexion à la BDD


$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres options='--client_encoding=UTF8'");
Flight::set('db', $link);


//              Routes utilisables


Flight::route('/', function(){
	Flight::redirect('/accueil');
});


Flight::route('/accueil', function() {
    Flight::render('accueil');
});


Flight::route('/jeu', function() {
	Flight::render('jeu');
});


//              Routes pratiques


//      Gestion des objets

Flight::route('/premierObjet', function(){
	$IdPoint = '1';
	$link = Flight::get('db');

	if (isset($IdPoint) and !empty($IdPoint)) {
		$reponse = pg_query($link, "SELECT *, ST_AsGeoJSON(geom) AS geom_json FROM items WHERE id=". $IdPoint);
		$resultat = pg_fetch_all($reponse, PGSQL_ASSOC);

		if (!$resultat) {
			$resultat = []; // Retourne un tableau vide si aucune donnée n'est trouvée
		};
		Flight::json(['resultat' => $resultat]);
	};
});

Flight::route('/objetSuivant', function() {
	$IdPoint = Flight::request()->data->IdPoint;
	$link = Flight::get('db');

	if (isset($IdPoint) and !empty($IdPoint)) {
		$reponse = pg_query($link, "SELECT *, ST_AsGeoJSON(geom) AS geom_json FROM items WHERE previous_item_id=". $IdPoint);
		$resultat = pg_fetch_all($reponse, PGSQL_ASSOC);

		if (!$resultat) {
			$resultat = []; // Retourne un tableau vide si aucune donnée n'est trouvée
		};
		Flight::json(['resultat' => $resultat]);
	};
});


//      Gestion des données du joueur

Flight::route('POST /add-pseudo', function() {
	$link = Flight::get('db');
	$input = json_decode(file_get_contents('php://input'), true); // Récupérer les données envoyées en POST

    if (isset($input['pseudo']) && !empty($input['pseudo'])) {
        $pseudo = pg_escape_string($link, $input['pseudo']); // Sécuriser le pseudo
        // Requête pour ajouter le pseudo
        $query = "INSERT INTO joueurs (pseudo) VALUES ('$pseudo')";
        $result = pg_query($link, $query);
    } else {
        echo json_encode(['success' => false, 'message' => 'Il faut définir un pseudo !']);
    }
});

Flight::route('POST /save-score', function() {
    $link = Flight::get('db');
    // Lire les données JSON envoyées par le client
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['pseudo']) && isset($data['time'])) {
        $pseudo = $data['pseudo'];
        $time = $data['time'];
        $query = "UPDATE Joueurs SET score = $2 WHERE pseudo = $1";
        $result = pg_query_params($link, $query, array($pseudo, $time)); //params permet l'ajout de paramètres : pratique !
    } else {
        echo json_encode(['success' => false, 'message' => 'Il manque une donnée']);
    }
});

Flight::route('GET /players', function() {
    $link = Flight::get('db');
    $query = 'SELECT pseudo, score FROM joueurs ORDER BY score ASC LIMIT 10'; //On limite le Hall Of Fame aux 10 meilleurs joueurs
    $result = pg_query($link, $query);

    // Vérifier si la requête a réussi
    if (!$result) {
        echo json_encode(['error' => 'Erreur de récupération des joueurs: ' . pg_last_error($link)]);
    }
    // Récupérer les résultats sous forme de tableau
    $players = pg_fetch_all($result);
    // Retourner les données sous forme de JSON
    echo json_encode($players);
});



Flight::start();
?>