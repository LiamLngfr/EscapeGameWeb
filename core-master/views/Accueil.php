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
            <p>
                Après une soirée animée sur la parcelle Y du campus de l’ENSG, les Ensgagés ont décidé d’organiser une cleanwalk pour venir à bout des déchets omniprésents à cet endroit (sans doute à cause des autres écoles…). Vous vous dîtes que pour vous remettre en forme après vos légendaires pas de danse de la veille, ça ne pourrait pas vous faire de mal d’y participer.
                Alors que vous alternez entre capsules de bière et mégots, un bout de papier froissé attire votre attention : vous le ramassez en essayant de garder l’équilibre et constatez que c’est sans doute la seule chose en bon état sur la parcelle en ce moment. Cette boule de papier froissée s’avère être un antique parchemin qui semble mener à un trésor inestimable : le faucon d’argent.
            </p>
            <p>
                Ni une, ni deux, et parce que manquer quelques cours ne vous fait pas peur, vous décidez de partir pour cette aventure !
            </p>
        </header>
        <div id="apppseudo">
            <h2>Jouer au jeu</h2>
    	    <form action='/jeu' @submit.prevent="ajouterPseudo">
                <label for="pseudo">Pseudo : </label>
                <input type="text" id="pseudo" v-model="pseudo" required placeholder="Entrez votre pseudo" />
                <button type="submit">Jouer</button>
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