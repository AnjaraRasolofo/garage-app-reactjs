# Garage App Frontend

Application frontend développée en React permettant de gérer un garage automobile (clients, véhicules, réparations, etc.) en consommant une API backend sécurisée.

## Fonctionnalités

*  Authentification (JWT)
*  Gestion des utilisateurs (admin / client)
*  Gestion des véhicules
*  Gestion des réparations / interventions
*  Dashboard avec statistiques
*  Communication avec API REST

##  Stack technique

* React JS
* Axios (ou Fetch API)
* React Router
* Bootstrap / Tailwind (selon ton cas)
* JWT Authentication

##  Structure du projet

```
src/
│── components/     # Composants réutilisables
│── pages/          # Pages principales
│── services/       # Appels API
│── context/        # Gestion état global (Auth, etc.)
│── hooks/          # Hooks personnalisés
│── assets/         # Images, styles
│── App.js
│── main.jsx / index.js
```

##  Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/garage-frontend.git
cd garage-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration des variables d’environnement

Créer un fichier `.env` à la racine :

```env
REACT_APP_API_URL=http://localhost:8000/api
```

En production :

```env
REACT_APP_API_URL=https://ton-domaine.com/api
```

##  Lancer le projet

```bash
npm run dev
```

ou

```bash
npm start
```

##  Authentification

L’application utilise un système JWT :

* Login → récupération du token
* Stockage (localStorage / context)
* Ajout automatique dans les headers :

```js
Authorization: Bearer <token>
```

##  Connexion avec l’API

Exemple avec Axios :

```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

##  Build production

```bash
npm run build
```

Les fichiers seront générés dans :

```
/dist ou /build
```

##  Déploiement

### VPS (Apache / Nginx)

1. Build du projet :

```bash
npm run build
```

2. Copier les fichiers vers le serveur :

```bash
scp -r dist/* user@vps:/var/www/html
```

3. Configurer le serveur web :

#### Exemple Nginx

```nginx
server {
    listen 80;
    server_name ton-domaine.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

##  Problèmes courants

###  Erreur CORS

Configurer ton backend Symfony :

```yaml
# nelmio_cors.yaml
nelmio_cors:
    defaults:
        allow_origin: ['*']
        allow_headers: ['Content-Type', 'Authorization']
        allow_methods: ['GET', 'POST', 'PUT', 'DELETE']
```

###  Token JWT invalide

* Vérifier clé privée / publique côté backend
* Vérifier expiration du token

##  Aperçu

*(Ajoute ici des screenshots de ton app)*

##  Auteur

* Ton nom

##  Licence

MIT
