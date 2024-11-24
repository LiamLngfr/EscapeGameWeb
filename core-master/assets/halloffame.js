const app_hof = Vue.createApp({
    data() {
        return {
            players: [] // Liste des joueurs vide au départ
        };
    },

    mounted() {
        fetch('/players')
            .then(response => response.json())
            .then(data => {
                this.players = data;
                console.log(this.players); // Affiche tous les joueurs récupérés

                // Attente pour être sûr que la structure est créée
                this.$nextTick(() => {
                    for (let player of this.players) { // On ajoute chaque joueur au tableau
                        this.addLine(player);
                    }
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des joueurs:', error));
    },

    methods: {
        addLine(player) {
            const table = document.getElementById("hof");
            const tbody = table.getElementsByTagName("tbody")[0];

            const newLine = document.createElement("tr");

            const cell1 = document.createElement("th");
            cell1.textContent = player['pseudo'];        // Pseudo du joueur
            const cell2 = document.createElement("td");
            cell2.textContent = player['score'];         // Score du joueur
            const cell3 = document.createElement("td");
            cell3.textContent = tbody.rows.length + 1;   // Rang du joueur : ils sont rangés dans l'ordre de score croissant (+ petit temps) donc il suffit d'indenter

            newLine.appendChild(cell1);
            newLine.appendChild(cell2);
            newLine.appendChild(cell3);

            tbody.appendChild(newLine);
        }
    }
});

app_hof.mount('#apphof');
