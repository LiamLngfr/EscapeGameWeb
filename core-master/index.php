<?php

declare(strict_types=1);
session_start();

// phpinfo()

$link = pg_connect("host=localhost dbname=postgres user=postgres password=postgres options='--client_encoding=UTF8'");


$reponse = pg_query($link, "SELECT * FROM items");
$resultat = pg_fetch_all($reponse, PGSQL_ASSOC);

foreach ($resultat as $resultats) {
  echo $resultats["id"];
}



require 'flight/Flight.php';

Flight::route('/', function () {
});
Flight::start();









?>
