Vue.createApp({
  data() {
    return {
      startTime: null, // Timestamp du début
      elapsedTime: 0,  // Temps écoulé en millisecondes
      isRunning: false // État du jeu
    }
  },
  computed: {
    // Formater le temps pour l'afficher au format MM:SS
    formattedTime() {
      const totalSeconds = Math.floor(this.elapsedTime / 1000); // Convertir en secondes
      const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const seconds = (totalSeconds % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
  },
  methods: {
    startGame() {
      this.isRunning = true;
      this.startTime = Date.now(); // Enregistre l'heure actuelle en millisecondes
      this.elapsedTime = 0; // Réinitialise le temps écoulé
      console.log(`Jeu commencé à : ${this.startTime}`);
    },
    endGame() {
      if (this.isRunning) {
        const endTime = Date.now(); // Enregistre l'heure de fin
        this.elapsedTime = endTime - this.startTime; // Calcul du temps écoulé
        this.isRunning = false; // Arrêter le jeu
        console.log(`Jeu terminé à : ${endTime}, Temps écoulé : ${this.elapsedTime} ms`);
        // alert(`Temps final : ${this.formattedTime}`);
      }
    }
  }
}).mount("#apptemps")
