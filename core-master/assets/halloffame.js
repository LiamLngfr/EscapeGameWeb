const app_hof = Vue.createApp({
    data() {
        return {
            players: [] // Liste des joueurs vide au départ
        };
    },

    mounted() {
        // Récupérer les joueurs dès que le composant est monté
        fetch('/players')  // Appel à l'API Flight PHP
            .then(response => response.json())
            .then(data => {
                this.players = data;  // Stocker les données récupérées dans la variable `players`
                console.log(this.players); // Affiche tous les joueurs récupérés

                // Utiliser nextTick pour être sûr que Vue a mis à jour le DOM
                this.$nextTick(() => {
                    // Ajouter chaque joueur au tableau
                    for (let player of this.players) {
                        this.ajouterLigne(player);
                    }
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des joueurs:', error));
    },

    methods: {
        // Fonction pour ajouter une ligne au tableau
        ajouterLigne(player) {
            // Récupérer le tableau et son corps (tbody)
            const tableau = document.getElementById("hof");
            const tbody = tableau.getElementsByTagName("tbody")[0];

            // Créer une nouvelle ligne
            const nouvelleLigne = document.createElement("tr");

            // Créer des cellules pour la nouvelle ligne
            const cellule1 = document.createElement("th");
            cellule1.textContent = player['pseudo']; // pseudo du joueur
            const cellule2 = document.createElement("td");
            cellule2.textContent = player['score']; // score du joueur
            const cellule3 = document.createElement("td");
            cellule3.textContent = tbody.rows.length + 1; // Numéro de la ligne

            // Ajouter les cellules à la nouvelle ligne
            nouvelleLigne.appendChild(cellule1);
            nouvelleLigne.appendChild(cellule2);
            nouvelleLigne.appendChild(cellule3);

            // Ajouter la nouvelle ligne au tableau (dans le tbody)
            tbody.appendChild(nouvelleLigne);
        }
    }
});

// Monter l'application Vue.js dans l'élément avec l'ID "apphof"
app_hof.mount('#apphof');
