<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>
<?php
require 'flight/Flight.php';
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


//Modif pdt que Liam code
/*
function ajouterPseudo() {
    $input = json_decode(file_get_contents('php://input'), true); // Récupérer les données envoyées en POST
    if (isset($input['pseudo']) && !empty($input['pseudo'])) {
        $pseudo = pg_escape_string($link, $input['pseudo']); // Sécuriser le pseudo

        // Requête SQL pour insérer le pseudo dans la table 'users'
        $query = "INSERT INTO joueurs (pseudo) VALUES ('$pseudo')";
        $result = pg_query($link, $query);

        // Réponse JSON en cas de succès ou d'erreur
        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Pseudo ajouté avec succès!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'ajout du pseudo.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Le pseudo est requis.']);
    }
}
*/
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


Flight::start();
?>