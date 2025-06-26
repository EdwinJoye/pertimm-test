# Test Technique Pertimm - Niveau 1

Implémentation du test technique automatisé pour Pertimm, respectant les consignes du document officiel.

## Description

Ce projet automatise le processus complet requis par le test technique :

1. **Register** - Inscription utilisateur dans l'API
2. **Login** - Connexion et récupération du token d'authentification
3. **Create Application** - Création d'une candidature via job-application-request
4. **Wait for Completion** - Surveillance du statut jusqu'à "COMPLETED"
5. **Confirm Application** - Confirmation finale (sous 30 secondes)

## Spécifications techniques

- **API** : Concrete-datastore (https://hire-game.pertimm.dev/)
- **Authentification** : Token-based avec header `Authorization: Token <token>`
- **Contrainte temporelle** : Confirmation sous 30 secondes après démarrage
- **Endpoints utilisés** :
  - `POST /api/v1.1/auth/register/`
  - `POST /api/v1.1/auth/login/`
  - `POST /api/v1.1/job-application-request/`
  - `GET <application_url>` (polling jusqu'à COMPLETED)
  - `PATCH <confirmation_url>` (confirmed: true)

## Installation

```bash

git clone https://github.com/VOTRE_USERNAME/10-Pertimm-test.git
cd 10-Pertimm-test


npm install
```

## Configuration

Créer un fichier `.env` à la racine du projet :

```env
API_BASE_URL=https://hire-game.pertimm.dev
USER_EMAIL=votre.email@example.com
USER_PASSWORD=votre_mot_de_passe
USER_FIRST_NAME=Votre_Prénom
USER_LAST_NAME=Votre_Nom
```

## Utilisation

```bash

npm run dev
```

## Structure du projet

```
src/
├── main.ts              # Point d'entrée principal
├── services/api.ts      # Fonctions d'API
├── types/config.ts      # Types TypeScript
└── index.ts            # Configuration
```

## Logs de sortie

Le script affiche les étapes importantes :

- Démarrage du test
- Progression de l'application
- Confirmation de succès

## Gestion d'erreurs

En cas d'erreur, le script s'arrête et affiche le détail de l'erreur dans la console.
