<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="UTF-8">
    <title>Accueil - Le faucon d'argent</title>
    <link rel="icon" href="../assets/image/favicon.ico" type="image/x-icon">

    <!-- Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

    <link rel="stylesheet" href="assets/accueil.css">
  </head>

  <body>
    <p>
    	<h2>Jouer au jeu</h2>
    	<div id="apphof">
    		<form action='/jeu' @submit.prevent="ajouterPseudo">
            	<label for="pseudo">Pseudo : </label>
            	<input type="text" id="pseudo" v-model="pseudo" required />
            	<button type="submit">Envoyer</button>
        	</form>
        	<!-- <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p> -->
        </div>
        <script src="../assets/halloffame.js"></script>
    	<a href="/jeu" Title="page_de_jeu">Jouer au jeu</a>
    </p>
    <p>
    	<h2>Hall of Fame</h2>
    		<table>
                <thead>
                    <tr>
                        <th scope="col">Pseudo</th>
                        <th scope="col">Score</th>
                        <th scope="col">Classement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Test</th>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
    </p>

  </body>

</html>