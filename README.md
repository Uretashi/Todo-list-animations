# Projet TODO list

Projet réalisé dans le cadre d’un cours de l’ESTIAM, fait par **Alexandre Hoffman, Gary Mengus et Vincent Rabajoie**. Ce todolist est présent en 3 exemplaires censés utiliser trois techniques pour faire des animations : directement sur l’élément, par des classes css et par une librairie.

## Script disponible

Dans ce projet, nous pouvons lancer les tests ci-dessous.

### `yarn start` / `npm start`

Permet de lancer le projet à l’adresse : http://localhost:3000 
La page sera rechargée à chaque changement apporter.

### `yarn test` / `npm test`

Lance les tests définis.

## Les différents Todolist

### Todolist Pure CSS

Ce todolist contient des animations CSS qui sont réalisés sur les éléments directement sur les éléments notamment via la manipulation via le JS.
Cette page a la particularité d’être construite sous le modèle hooks avec notamment l’utilisation de useState. Autre spécificité par rapport au autre todolist, lorsque l’utilisateur veut éditer une tâche, le state va être modifier directement en même temps de la prise de note.

### Todolist CSS Class

Une todo list dont les animations sont réalisés avec l’affectation et la suppression de classe CSS sur les différents éléments

### Todolist Library

Cette todolist a des animations gérées par la librairie “framer-motion” qui est facile d’utilisation.

### Tests unitaires

Nous avons des tests unitaires qui permettent de tester les fonctionnalités du todolist (création, édition et suppression) et aussi un test pour voir s’il y a bien un rendu. Mais aussi, nous avons des tests unitaires pour le CSS.
