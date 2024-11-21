let map = L.map('map').setView([-25, 50], 3); //Sur Paris : [48.85, 2.35]


let vue = Vue.createApp({
  data() {
    return {
      resultat: null,
      feature: L.featureGroup([]),
      map: null,
      point: [],
      inventaire: [],
      lock: [],
      code: null
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
      
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Ne pas oublier de supprimer ce truc qui sert à rien mais fais plaisir
      // var popup = L.popup();
      // map.on('click', (e) => {
      //   popup
      //     .setLatLng(e.latlng)
      //     .setContent("Tu as cliqué aux coordonnées " + e.latlng.toString().replace('LatLng', '(Lat,Long) = '))
      //     .openOn(map);
      // });
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
          const resul = r['resultat'][0]; // Résultat requête SQL
          this.point.push(resul)

          // Vérifie que la carte est bien là
          if (map) {
            // Ajoute le GeoJSON + récupère le marqueur
            let marker = this.addGeoJSONToMap(resul);

            // Vérifie sla validité du marqueur
            if (marker) {

              //On associe le popup au marker un seule fois, pour ne pas le refaire à chaque clic
              // const contenu_popup = "C'est moi le pingouin !"
              // marker.bindPopup(contenu_popup);
              

              var popupContent = `
                <div>
                  <label for="codeInput">Entrez un code :</label><br>
                  <input type="C'est moi le pingouin !" id="codeInput" placeholder="Code..." /><br><br>
                  <button id="confirmButton">Confirmer</button>
                </div>
              `;
              marker.bindPopup(popupContent)

              // Gestionnaire d'événement lorsque le popup est ouvert
              console.log(marker)
              marker.on('popupopen',  () => {
                // Attendez que le DOM du popup soit chargé
                setTimeout(() => {
                  // Récupérer les éléments à chaque ouverture
                  var confirmButton = document.getElementById('confirmButton');
                  var codeInput = document.getElementById('codeInput');

                  if (confirmButton && codeInput) {
                    // Ajout du gestionnaire de clic
                    confirmButton.onclick = () => {
                      var enteredCode = codeInput.value; // Récupérer la valeur de l'input
                      if (enteredCode) {
                        if (marker.getLayers()[0].feature.properties.code_to_unlock === enteredCode) {
                          this.lock.forEach(element => {
                            // element['locked'] = 't';
                            // this.obj_suivant(marker.getLayers()[0].feature.properties.id)
                            this.addGeoJSONToMap(element);
                            
                          });
                          this.lock = []
                           // Cela fonctionnera car `this` est correctement lié
                        }
                        marker.closePopup(); // Ferme le popup après confirmation
                      } else {
                        alert('Veuillez entrer un code !');
                      }
                    };
                    
                  } else {
                    console.error("Les éléments du popup n'ont pas été trouvés.");
                  }
                }, 10); // Attendre un petit délai si nécessaire
              });

              this.addMarkerSuivant(marker); //Ajout du marker suivant


              // marker.on('click', () => {
              //   marker.openPopup();
              //   this.obj_suivant(marker.getLayers()[0].feature.properties.id);
              // });
            } else {
              console.warn("Le GeoJSON n'a pas généré de marqueur.");
            }
          } else {
            console.error("La carte n'est pas initialisée.");
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    },


    obj_suivant(id_prec) {
      fetch('/objetSuivant', {
        method: 'post',
        body: 'IdPoint=' + id_prec,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
  
      }})
        .then(r => r.json())
        .then(r => {
          r['resultat'].forEach((element) => {
            this.point.push(element);
            if (element['locked'] === 'f') {
              if (map) {
                let marker = this.addGeoJSONToMap(element);
                this.addMarkerSuivant(marker);
              };
            } else {
              this.lock.push(element);
              console.log(element);
            };
          });
          
          
        });
    },

    addMarkerSuivant(marker){
      // marker.bindPopup(popup)
      marker.on('click', () => {
        marker.openPopup();
        this.obj_suivant(marker.getLayers()[0].feature.properties.id);
      });
    },



    addGeoJSONToMap(resul) {
      // Transforme le résultat en JSON au format attendu par Leaflet
          let resultat = {
            "type": "Feature",
            "geometry": JSON.parse(resul["geom_json"]),
            "properties": resul
          };
          // console.log(resultat)
      // Vérifie la validité du JSON
      if (resultat) {
        // console.log("Ajout des données JSON :", resultat);

        // Ajoute les données à la carte
        return L.geoJSON(resultat).addTo(map);
      } else {
        console.warn("Les données GeoJSON sont invalides ou inexistantes.");
      }
    },








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
