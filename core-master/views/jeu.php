<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>Le faucon d'argent</title>
    <link rel="icon" href="../assets/image/favicon.ico" type="image/x-icon">
    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

    <link rel="stylesheet" href="assets/jeu.css">

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  </head>

  <body>
    <div id="titre">
      <h2>Le faucon d'argent</h2>
    </div>
    <div id="appmap">
      <div id="inventaire">
        <h3>Inventaire</h3>
        <ul>
          <li v-for= "item in inventaire">
            <img v-bind:src="item.chemin_img" alt="" height="40px" width="30px">
          </li>
        </ul>
      </div>
      <div id="triche">
        <input type="checkbox" v-model="triche" @input="toggleWMS()">Triche
      </div>
    </div>
    <div id="map"></div>
  <script src="assets/jeuvue.js"></script>
  </body>

</html>