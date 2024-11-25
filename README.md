# EscapeGameWeb
Projet Web à l'ENSG Géomatique sur le thème d'un escape game géographique

**Installation :**  
Versions utilisées: 
 - MAMP est utilisé avec PHP en version 7.4.16
 - Postgres 17.0
 - Geoserver version 2.26.0


**Comment jouer ?**  
 - Installer MAMP en veillant à le configurer sur la bonne version et à suivre les consignes du sujet
 - Installer la config geoserver, puis créer un store connecté à la base de donnée. Ensuite, créer une couche de point relié à la base de ddonnée et mettre le style heatmap.xml dans un style heatmap. Enfin lier la couche de point au style.
 - Démarrer MAMP
 - Ouvrir son navigateur et taper dans la barre de recherche "localhost/"
 - Prendre le temps d'admirer la beauté de la page
 - Entrer son pseudo et cliquer sur "Jouer"
 - Se déplacer et zoomer / dézoomer comme sur une carte interactive classique
 - Cliquer sur les objets pour intéragir
 - La partie se fini quand le popup du dernier objet est fermé



**Solution:**  
Le joueur apparaît au niveau de la parcelle Y, face à l'ENSG Géomatique. Il doit se rendre ensuite à Antananarivo, capitale de Madagascar. 
Ici, un pingouin va lui demander un code pour poursuivre son aventure. Le code peut être trouvé en Islande, à Reykjavik (sinon, c'est 4731).
Vous retournez voir le pingouin et lui donnez le code. Il vous dit d'aller à Pékin, où vous récupérerez une "clé" puis à Londres, où vous utiliserez la "clé".
Vous irez ensuite à Moscou, où une gravure vous dira d'aller à Mexico. De Mexico, vous vous rendrez à Canberra, puis à Brasilia. Enfin, vous reviendrez à la parcelle Y.

A chaque étape, il faudra cliquer sur les marqueurs pour débloquer les suivants, sauf pour le code (4731) qu'il faut taper et la clef que l'on récupère dans l'inventaire.
Après avoir cliqué sur le dernier marqueur et avoir fermé le popup, le joueur est redirigé vers l'accueil et peut voir son score inscrit dans le Hall Of Fame.
