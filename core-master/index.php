<?php
require 'flight/Flight.php';
$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres options='--client_encoding=UTF8'");


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

Flight::route('/objetSuivant', function() {
	$IdPoint = Flight::request()->data->IdPoint;

	if (isset($IdPoint) and !empty($IdPoint)) {
		$reponse = pg_query($link, "SELECT * FROM items WHERE id=". $IdPoint);
		$resultat = pg_fetch_all($reponse, PGSQL_ASSOC);

		Flight::json(['resultat' => $resultat]);
	};
});


Flight::start();
?>