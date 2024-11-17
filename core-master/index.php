<?php
require 'flight/Flight.php';
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
Flight::start();
?>