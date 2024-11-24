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
        <header>
            <h1>Le faucon d'argent</h1>
        </header>
        <h2>Jouer au jeu</h2>
        <div id="apppseudo">
    	   <form action='/jeu' @submit.prevent="ajouterPseudo">
                <label for="pseudo">Pseudo : </label>
                <input type="text" id="pseudo" v-model="pseudo" required />
                <button type="submit">Envoyer</button>
            </form>
        </div>
        <script src="../assets/pseudo.js"></script>
        <div id='apphof'>
    	   <h2>Hall of Fame</h2>
    	   <table id="hof">
                <thead>
                    <tr>
                        <th scope="col">Pseudo</th>
                        <th scope="col">Score</th>
                        <th scope="col">Classement</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <script src="../assets/halloffame.js"></script>
    </body>
</html>