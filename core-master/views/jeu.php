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
      <p>Titre provisoire pour tester</p>
      
    </div>
    <div id="appmap">
      <input type="checkbox" v-model="triche" @input="toggleWMS()"> Triche
      <p>Chronomètre : {{ formattedTime }}</p>
      <ul v-for= "item in inventaire">
        <img v-bind:src="item.chemin_img" alt="" height="50px" width="50px">
      </ul>
      
    </div>
    <div id="map"></div>
    <FOOTER id="footer">
      <ul>
        
      </ul>
    
    </FOOTER>
  <script src="assets/jeuvue.js"></script>
  </body>

</html>