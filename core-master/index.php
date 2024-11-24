<?php
require 'flight/Flight.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres options='--client_encoding=UTF8'");
Flight::set('db', $link);



Flight::route('/', function(){
	Flight::redirect('/accueil');
});
Flight::route('/accueil', function() {
    Flight::render('accueil');
});
Flight::route('/jeu', function() {
	Flight::render('jeu');
});


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



Flight::route('POST /add-pseudo', function() {

	$link = Flight::get('db');

	$input = json_decode(file_get_contents('php://input'), true); // Récupérer les données envoyées en POST
    if (isset($input['pseudo']) && !empty($input['pseudo'])) {
        $pseudo = pg_escape_string($link, $input['pseudo']); // Sécuriser le pseudo

        // Requête pour ajouter le pseudo
        $query = "INSERT INTO joueurs (pseudo) VALUES ('$pseudo')";
        $result = pg_query($link, $query);

        // Succès ou erreur
        if ($result) {
            // En cas de succès, on renvoie un message de succès et un indicateur de redirection
            // $query = "DELETE FROM joueurs WHERE pseudo = ('$pseudo')";
            // pg_query($link, $query);
            echo json_encode(['success' => true, 'message' => 'Pseudo ajouté avec succès!']); //, 'redirect' => '/jeu'
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'ajout du pseudo.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Le pseudo est requis.']);
    }
});

Flight::route('/temps', function() {
	Flight::render('test_temps');
});


// Route Flight pour recevoir les données et sauvegarder le score
Flight::route('POST /save-score', function() {

    $link = Flight::get('db');

    // Lire les données JSON envoyées par le client
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérifier que les données sont présentes
    if (isset($data['pseudo']) && isset($data['time'])) {
        $pseudo = $data['pseudo'];
        $time = $data['time'];

        // Préparer la requête SQL pour insérer les données dans la table Joueurs
        $query = "UPDATE Joueurs SET score = $2 WHERE pseudo = $1";
        
        // Exécuter la requête avec les paramètres
        $result = pg_query_params($link, $query, array($pseudo, $time));

        // Vérifier si l'insertion a réussi
        if ($result) {
            // Si succès, renvoyer une réponse JSON de succès
            echo json_encode(['success' => true, 'message' => 'Score ajouté avec succès.']);
        } else {
            // Si erreur, renvoyer une réponse JSON d'erreur
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'insertion dans la base de données.']);
        }
    } else {
        // Si les données sont manquantes
        echo json_encode(['success' => false, 'message' => 'Données manquantes.']);
    }
});

Flight::start();
?>