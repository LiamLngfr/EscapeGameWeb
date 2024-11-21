<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>Accueil - Le faucon d'argent</title>
    <link rel="icon" href="../assets/image/favicon.ico" type="image/x-icon">

    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>


    
  </head>
  <body>
    <div id="apptemps">
        <div>
            <h1>Chronomètre : {{ formattedTime }}</h1>
            <button v-if="!isRunning" @click="startGame">Lancer le jeu</button>
            <button v-if="isRunning" @click="endGame">Terminer le jeu</button>
        </div>
    </div>
    <script src="../assets/test_temp.js"></script>
  </body>
</html>