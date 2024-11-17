<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Titre de la page</title>
  </head>
  <body>
    <p>Le texte de mon premier paragraphe</p>
  </body>
</html>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte Interactive avec Leaflet</title>
    <!-- Inclure les CSS de Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha384-oVBs/AheF8IksfVsLW13ThAkUqBpEL2FutIcDdgLlFZjHxbN5u8GbX0HDlTq5ACt" crossorigin="anonymous">
    <style>
        #map {
            height: 500px; /* Définir la hauteur de la carte */
            width: 100%;
        }
    </style>
</head>
<body>
    <h1>Carte Interactive avec Leaflet</h1>
    <div id="map"></div>

    <!-- Inclure le JavaScript de Leaflet -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha384-oVBs/AheF8IksfVsLW13ThAkUqBpEL2FutIcDdgLlFZjHxbN5u8GbX0HDlTq5ACt" crossorigin="anonymous"></script>
    <script>
        // Initialiser la carte
        var map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonnées de Paris

        // Ajouter une couche de tuiles (Tile Layer)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Ajouter un marqueur
        var marker = L.marker([48.8566, 2.3522]).addTo(map)
            .bindPopup('Bienvenue à Paris !')
            .openPopup();
    </script>
</body>
</html>


<!-- Pour créer des forms-->
	<div id="app">
        {{ message }}
        {{ reversedMessage}}
        <label>
            <input type="checkbox" v-model="isChecked">
            Cochez cette case
        </label>

        <p v-if="isChecked">Bon toutou</p>
        <p v-else>Pas gentil</p>
    </div>

    <!-- Côté js -->
    <script type="text/javascript">
    	Vue.createApp({
    		data() {
    			return {
    				isChecked : false,
				};
			};
		}).mount('#app');
    </script>


<!-- jeu.php -->
<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>Titre de la page</title>
    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    <link rel="stylesheet" href="assets/jeu.css">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

  </head>

  <body>
    <div id="map"></div>
    <script src="assets/jeucarte.js"></script>
    <script src="assets/jeuvue.js"></script>
  </body>

</html>



var map = L.map('map', {
          center: [48.85, 2.35],
          zoom: 13,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);