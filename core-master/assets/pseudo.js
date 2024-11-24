const app_pseudo = Vue.createApp({
    data() {
        return {
            pseudo: '', // Récupère le pseudo depuis LocalStorage
            message: '',
            success: false
        };
    },
    methods: {
        async ajouterPseudo() {
            try {
                const response = await fetch('/add-pseudo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pseudo: this.pseudo
                    })
                });

                if (!response.ok) {
                    console.error('Erreur de requête, statut:', response.status);
                    const errorText = await response.text();
                    console.log('Réponse brute:', errorText);
                    throw new Error('Erreur côté serveur');
                }

                let data;
                try {
                    data = await response.json();
                } catch (e) {
                    console.error('Erreur lors du parsing JSON:', e);
                    throw new Error('Réponse du serveur non valide');
                }
                console.log('Données reçues:', data);

                this.message = data.message;
                this.success = data.success;

                if (this.success) {
                    localStorage.setItem('pseudo', this.pseudo); // Sauvegarder le pseudo pour les autres fichiers : pratique de ouf
                    this.pseudo = ''; // Réinitialiser le champ
                    window.location.href = '/jeu'; // Redirection vers la page de jeu

                }
            } catch (error) {
                this.message = "Erreur lors de l'ajout du pseudo.";
                this.success = false;
                console.error('Fetch Error:', error);
            }
        }
    }
});

// Monter l'application Vue.js
app_pseudo.mount('#apppseudo');
