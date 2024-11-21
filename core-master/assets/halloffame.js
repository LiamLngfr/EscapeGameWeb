const app_pseudo = Vue.createApp({
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

        		// Vérifier si la réponse est OK
        		if (!response.ok) {
            		// Si non : affichage de l'erreur
		            console.error('Erreur de requête, statut:', response.status);
		            const errorText = await response.text();
        		    console.log('Réponse brute:', errorText);
            		throw new Error('Erreur côté serveur');
        		}

        		// Si OK, conversion en JSON
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


app_pseudo.mount('#apphof');






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