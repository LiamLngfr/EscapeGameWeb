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
Flight::route('/test', function() {
	Flight::render('testvueleaflet');
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


		$reponse = pg_query($link, "SELECT *, ST_AsGeoJSON(geom) AS geom_json FROM items WHERE id=". $IdPoint);
		$resultat = pg_fetch_all($reponse, PGSQL_ASSOC);


		if (!$resultat) {
			$resultat = []; // Retourne un tableau vide si aucune donnée n'est trouvée
		};

		Flight::json(['resultat' => $resultat]);
	};
});





Flight::start();
?>