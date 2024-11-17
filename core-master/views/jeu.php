<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>Titre de la page</title>
    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

    <link rel="stylesheet" href="assets/jeu.css">

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    

  </head>

  <body>
    <div id="appmap">
    <map-component></map-component> <!-- Vue.js va gérer ce composant -->
  </div>

  <!-- Inclure votre fichier JavaScript où vous définissez Vue.js et Leaflet -->
  <script src="assets/jeuvue.js"></script>
  </body>

</html>