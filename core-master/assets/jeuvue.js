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
      startTime: null, // Temps de départ
      elapsedTime: 0,  // Temps écoulé (ms)
      isRunning: false, // Si le jeu est fini ou non
      pseudo: ''
    };
  },

  created() {
    this.init_pingouin(); // Charge le GeoJSON du premier objet au départ
  },

  mounted() {
    this.initMap(); // Charge la carte
    this.startGame();
    this.pseudo = localStorage.getItem('pseudo');
  },

  computed: {
    // Affichage du temps en mm:ss
    formattedTime() {
      const totalSeconds = Math.floor(this.elapsedTime / 1000); // Convertir en secondes
      const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
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
          if (map.getZoom()<marker.getLayers()[0].feature.properties.zoom){
            marker.remove(map)
          } else {
            marker.addTo(map)
          }
        })
      },);
    
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
            

            // Vérifie la validité du marqueur
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
                      var enteredCode = codeInput.value; // Récupérer l'input
                      if (enteredCode) {
                        if (marker.getLayers()[0].feature.properties.code_to_unlock === enteredCode) {
                          this.lock.forEach(element => {
                            // element['locked'] = 't';
                            // this.obj_suivant(marker.getLayers()[0].feature.properties.id)
                            var marker2 = this.addGeoJSONToMap(element);
                            this.addMarkerSuivant(marker2);
                            
                          });
                          this.lock = []
                        }
                        marker.closePopup(); // Ferme le popup
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

        if (marker.getLayers()[0].feature.properties.id === '99'){
          this.endGame()
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
      // Transforme le résultat en JSON au format de Leaflet
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
                // Création de l'icône
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
      if (this.triche === true) {
        this.wmsLayer.removeFrom(map)
      } else {
        this.wmsLayer.addTo(map)
      }
    },

    startGame() {
      this.isRunning = true;
      this.startTime = Date.now(); // Enregistre l'heure de début
      this.elapsedTime = 0; // Remets le temps écoulé à zéro
      console.log(`Jeu commencé à : ${this.startTime}`);
    },

    endGame() {
      if (this.isRunning) {
        const endTime = Date.now(); // Enregistre l'heure de fin
        this.elapsedTime = endTime - this.startTime; // Calcul du temps écoulé
        this.isRunning = false; // Arrêter le jeu
        console.log(`Jeu terminé à : ${endTime}, Temps écoulé : ${this.elapsedTime} ms`);
        // alert(`Temps final : ${this.formattedTime}`);

        this.saveScore();
      }
    },

    saveScore() {
      const data = {
        pseudo: this.pseudo,           // Pseudo du joueur
        time: this.formattedTime       // Temps formaté (mm:ss)
      };

      // Envoi des données via une requête POST au serveur (vers la route Flight /save-score)
      fetch('/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Envoi du pseudo et du temps en JSON
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Score enregistré avec succès');
        } else {
          console.error('Erreur lors de l\'enregistrement du score');
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi des données', error);
      });
    },


  },
}).mount('#appmap');
