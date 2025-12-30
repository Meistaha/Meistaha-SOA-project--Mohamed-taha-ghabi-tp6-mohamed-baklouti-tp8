# Gestion des personnes – Frontend

Interface web simple (HTML/CSS/JavaScript) pour consommer un backend REST JAX‑RS de gestion des personnes (Person) déployé sur Tomcat.

 🧩 Description du projet

Ce projet fournit un frontend web qui permet de :

- Lister toutes les personnes.
- Ajouter une personne.
- Modifier une personne.
- Supprimer une personne.
- Rechercher une personne par ID ou par nom.

Le frontend communique uniquement avec le backend REST JAX‑RS (aucun accès direct à la base de données).

 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- Fetch API pour les appels REST
- Backend : Java EE / JAX‑RS (Jersey) sur Apache Tomcat  
  - Base URL du backend : `http://localhost:8080/TestRS/test`

 📁 Structure du projet

WebContent/
├── index.html # Page principale (liste, formulaire, recherche)
├── styles.css # Styles de l'interface
└── app.js # Logique frontend + appels REST




 🔌 Endpoints REST consommés

Les endpoints exposés par le backend JAX‑RS (classe `RestRouter`) sont :  

- `GET  /users/affiche`  
  - Retour : `List<Person>` (JSON)

- `PUT  /users/add/{age}/{name}`  
  - Retour : `{"state": "ok"}`

- `PUT  /users/update/{id}/{age}/{name}`  
  - Retour : `{"state": "ok"}` 

- `DELETE /users/remove/{id}`  
  - Retour : `{"state": "ok"}`

- `GET  /users/getid/{id}`  
  - Retour : `{"state": "ok", "data": {Person}}` 

- `GET  /users/getname/{name}`  
  - Retour : `{"state": "ok", "data": {Person}}` 

La ressource complète côté frontend est donc :  

- Base API : `http://localhost:8080/TestRS/test/users/...`

## ▶️ Instructions pour exécuter le projet

 1. Prérequis

- Java + Maven (si utilisé pour le backend).
- Serveur **Apache Tomcat** (version compatible avec ton projet).
- MySQL avec la base `TP2` et la table `person` (id, name, age).
- Backend JAX‑RS configuré et fonctionnel (classe `RestRouter`, `PersonServiceImpl`, `ConnexionDB`).

 2. Lancer le backend

1. Importer le projet backend dans Eclipse (Dynamic Web Project / Maven).  
2. Vérifier la connexion MySQL dans `ConnexionDB.java` : URL, login, mot de passe.  
3. Démarrer Tomcat avec l’application `TestRS`.  
4. Tester rapidement dans Postman ou le navigateur :  
   - `GET http://localhost:8080/TestRS/test/users/affiche`

 3. Lancer le frontend

1. Placer les fichiers `index.html`, `styles.css`, `app.js` dans `WebContent/` (ou `src/main/webapp/`).  
2. Déployer le projet sur Tomcat.  
3. Ouvrir dans un navigateur :  
   - `http://localhost:8080/TestRS/index.html`  
4. Tester les fonctionnalités :  
   - Liste des personnes.  
   - Ajout / Modification / Suppression.  
   - Recherche par ID et par nom.



 🎥 Vidéo de démonstration

Lien vers le github :  
https://github.com/Meistaha/Meistaha-SOA-project--Mohamed-taha-ghabi-tp6-mohamed-baklouti-tp8/edit/main/README.md#L94C10-L94C49

ce travail est realisé par mohamed taha ghabi tp6 et mohamed baklouti tp8
