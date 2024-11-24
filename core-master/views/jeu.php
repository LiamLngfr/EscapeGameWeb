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
    </div>
    <div id="map"></div>
    <FOOTER id="footer">
      <p>Inventaire</p>
    </FOOTER>
  <!-- Inclure votre fichier JavaScript où vous définissez Vue.js et Leaflet -->
  <script src="assets/jeuvue.js"></script>
  </body>

</html>