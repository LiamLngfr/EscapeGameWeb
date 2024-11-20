const app = Vue.createApp({
    data() {
        return {
            pseudo: '', // Le pseudo entré par l'utilisateur
            message: '', // Message de succès ou d'erreur
            success: false // Indique si l'opération a réussi
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

        		// Vérifier si la réponse est OK (statut 200)
        		if (!response.ok) {
            		// Si la réponse n'est pas OK, afficher un message d'erreur avec le statut
		            		console.error('Erreur de requête, statut:', response.status);
		            const errorText = await response.text(); // Lire la réponse en texte brut
        		    console.log('Réponse brute:', errorText);
            		throw new Error('Erreur côté serveur');
        		}

        		// Si la réponse est OK, essayer de la convertir en JSON
        		const data = await response.json();
        		console.log('Données reçues:', data);

        		this.message = data.message;
        		this.success = data.success;

        		if (this.success) {
        		    this.pseudo = '';
        		    window.location.href = '/jeu';
        		}
    		} catch (error) {
        		this.message = "Erreur lors de l'ajout du pseudo.";
        		this.success = false;
        		console.error('Fetch Error:', error);
    		}
		}

    }
});

// Monter l'application Vue sur le DOM
app.mount('#apphof');






/*
let hof = Vue.createApp({
	data () {

	};

	updated() {
		this.load_pseudo();
	}




	methods: {
		load_pseudo() {

		}
	}


});

*/