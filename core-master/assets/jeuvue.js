let map = L.map('map').setView([48.840260, 2.587640], 18); //Sur Paris : [48.85, 2.35]


let vue = Vue.createApp({
  data() {
    return {
      resultat: null,
      feature: L.featureGroup([]),
      map: null,
      point: [],
      inventaire: [],
      lock: [],
      code: null,
      wmsLayer: null,
      afficherWMS: false,
      triche: false,
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

      this.wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/LiamGeoserver/wms', {
        layers: 'LiamGeoserver:items',
        format: 'image/png',
        transparent: true,
      });

      map.on('zoom', () => {
        this.point.forEach(marker => {
          console.log(map.getZoom())
          if (map.getZoom()<6){
            marker.remove(map)
          } else {
            marker.addTo(map)
          }
        })
      },)
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
          // this.point.push(resul)

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
                            var marker2 = this.addGeoJSONToMap(element);
                            this.addMarkerSuivant(marker2);
                            
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
            
            if (element['locked'] === 'f') {
              if (map) {
                let marker = this.addGeoJSONToMap(element);
                this.addMarkerSuivant(marker);
              };
            } else {
              this.lock.push(element);
            };
          });
          
          
        });
    },

    addMarkerSuivant(marker){
      // marker.bindPopup(popup)
      marker.on('click', () => {
        marker.openPopup();
        this.obj_suivant(marker.getLayers()[0].feature.properties.id);
        if (marker.getLayers()[0].feature.properties.pickable === 't' && !this.inventaire.includes(marker.getLayers()[0].feature.properties)) {
          this.inventaire.push(marker.getLayers()[0].feature.properties);
        };

        if (marker.getLayers()[0].feature.properties.id === '77'){
          console.log('You win !')
        };

        this.inventaire.forEach(element => {
          if (marker.getLayers()[0].feature.properties.item_to_unlock_id === element['id']){
            this.lock.forEach(element => {
              var marker2 = this.addGeoJSONToMap(element);
              this.addMarkerSuivant(marker2);});

          };
        });
        
      });
    },



    addGeoJSONToMap(resul) {
      // Transforme le résultat en JSON au format attendu par Leaflet
          let resultat = {
            "type": "Feature",
            "geometry": JSON.parse(resul["geom_json"]),
            "properties": resul
          };
      // Vérifie la validité du JSON
      if (resultat) {
        // Ajoute les données à la carte
        let marker = L.geoJSON(resultat, {
            pointToLayer: function (feature, latlng) {
                // Créer une icône personnalisée en fonction des propriétés
                var icon = L.icon({
                    iconUrl: feature.properties.iconUrl || resul["chemin_img"],
                    iconSize: [resul["taille_icon"],resul["taille_icon"]],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32]
                });
            return L.marker(latlng, { icon: icon });
            }
        })
        // let marker = L.geoJSON(resultat).addTo(map)
        this.point.push(marker);
        return marker;
      } else {
        console.warn("Les données GeoJSON sont invalides ou inexistantes.");
      };
    },

    toggleWMS() {
      console.log(this.point);
      if (this.triche === true) {
        this.wmsLayer.removeFrom(map)
      } else {
        this.wmsLayer.addTo(map)
      }
    },

    


  },
}).mount('#appmap');
