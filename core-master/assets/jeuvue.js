let vue = Vue.createApp({
  data() {
    return {
      resultat: null,
      feature: L.featureGroup([]),
      map: null,
    };
  },

  created() {
    this.init_pingouin(); // Charge le GeoJSON du premier objet au départ
  },

  mounted() {
    this.initMap(); // Charge la carte
  },

  methods: {
    initMap() {
      this.map = L.map('map').setView([48.85, 2.35], 3);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      // Ne pas oublier de supprimer ce truc qui sert à rien mais fais plaisir
      var popup = L.popup();
      this.map.on('click', (e) => {
        popup
          .setLatLng(e.latlng)
          .setContent("Tu as cliqué aux coordonnées " + e.latlng.toString().replace('LatLng', '(Lat,Long) = '))
          .openOn(this.map);
      });
    },

    init_pingouin() {
      fetch('/premierObjet', {
        method: 'post',
        body: '',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(r => r.json())
        .then(r => {
          const resul = r['resultat'][0]["geom_json"];
          //console.log(resul);

          // Transforme le résultat en JSON au format attendu par Leaflet
          this.resultat = {
            "type": "Feature",
            "geometry": JSON.parse(resul),
            "properties": {}
          };

          // Vérifie la carte avant l'ajout du JSON
          if (this.map) {
            this.addGeoJSONToMap();
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },

    addGeoJSONToMap() {
      // Vérifie la validité du JSON
      if (this.resultat) {
        console.log("Ajout des données JSON :", this.resultat);

        // Ajoute les données à la carte
        L.geoJSON(this.resultat).addTo(this.map);
      } else {
        console.warn("Les données GeoJSON sont invalides ou inexistantes.");
      }
    }
    
    




    
  }
}).mount('#appmap');

/*
//Requête Fetch à la base de donnée (à mettre dans une fonction qui se déclenche quand on appuie sur une balise (items))
//Remplacer LeNomDeTaVariable
fetch('/objetSuivant', {
  method: 'post',
  body: 'IdPoint=' + '6',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  
  }})
  .then(r => r.json())
  .then(r => {
  console.log(r) //Affiche le resultat, plus qu'à aller le chercher. Il faut s'enfoncer dans le tableau associatif (Tu peux remplacer .json par .txt pour mieux visualiser)
  let resultat = r['resultat'][0]
});
*/
