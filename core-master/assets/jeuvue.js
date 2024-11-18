let vuemap = Vue.createApp({});

vuemap.component('map-component', {
  template: '<div id="map"></div>',     //le div où la carte est contenue

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      var map = L.map('map').setView([48.85, 2.35], 10);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var popup = L.popup();

      function onMapClick(e) {
          popup
          .setLatLng(e.latlng)
          .setContent("Tu as cliqué aux coordonnées " + e.latlng.toString().replace('LatLng', '(Lat,Long) = '))
          .openOn(map);
      }

      map.on('click', onMapClick);
      }
    },
  });

vuemap.mount('#appmap');

//Requête Fetch pour le 1er objet, à déclencher dès le début du script (g juste peur de tt casser)
fetch('/premierObjet', {
  method: 'post',
  body: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  
  }})
  .then(r => r.json())
  .then(r => {
  console.log(r['resultat'][0])
  let resultat = r['resultat'][0]




  });





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