# SAE 501 - Développer pour le web ou Concevoir un dispositif interactif

- [SAE 501 - Développer pour le web ou Concevoir un dispositif interactif](#sae-501---développer-pour-le-web-ou-concevoir-un-dispositif-interactif)
  - [Structure du projet](#structure-du-projet)
  - [Mise en place](#mise-en-place)
    - [Pré-requis](#pré-requis)
    - [Installation](#installation)
    - [Utilisation - Mode développement](#utilisation---mode-développement)
      - [Docker - développement](#docker---développement)
    - [Utilisation - Mode production](#utilisation---mode-production)
      - [Docker - production](#docker---production)
  - [Tâches à effectuer](#tâches-à-effectuer)
    - [Yves](#yves)
    - [Abdel](#abdel)
    - [Bassem](#bassem)
  - [Utilisation de Git : Règles de nommage](#utilisation-de-git--règles-de-nommage)
  - [Nommage des branches](#nommage-des-branches)
    - [Types de branches](#types-de-branches-)
    - [Bonnes pratiques](#bonnes-pratiques-)
  - [Convention des messages de commit](#convention-des-messages-de-commit)
    - [Types autorisés](#types-autorisés-)
  - [Notes et astuces](#notes-et-astuces)
  - [Documentation](#documentation)
 
## Structure du projet

```
code/
├── database/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── styles/
│   └── uploads/
├── server/
│   ├── api-router/
│   ├── back-end-router/
│   ├── front-end-router.js
│   ├── debug-router.js
│   ├── index.js
│   └── uploader.js
└── src/
    ├── components/
    │   ├── front-end/
    │   └── back-end/
    ├── data/
    │   └── menu.json
    ├── layouts/
    │   ├── front-end/
    │   └── back-end/
    ├── pages/
    ├── scripts/
    │   ├── main.backend.js
    │   └── main.frontend.js
    └── styles/
```
## Mise en place

### Pré-requis

- node >= 20.10 (utilisez la commande `node -v` pour voir votre version)
  - Si jamais, pour diverses raisons, vous ne pouvez pas installer une version 20.10+ de nodejs, utilisez nvm pour pouvoir utiliser plusieurs versions de nodejs sur votre ordinateur ou passez par Docker
    - [Installer nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- mongodb (voir [MONGODB-NOSQL.md](https://github.com/DanYellow/cours/blob/main/s5-developpement-front/sae-501/MONGODB-NOSQL.md#installation) pour l'installation)
  - Note : Il est fort probable que vous ne puissiez pas utiliser MongoDB sur les ordinateurs de l'IUT. Pour pallier à ce problème, il faudra passer par MongoDB Atlas, un outil freemium permettant d'héberger la base de données

### Installation

> N'utilisez pas le terminal "Powershell" (Windows uniquement), il est très fort probable que les commandes liées à nodejs (node ou npm) ne fonctionnent pas. Utilisez l'invite de commandes (cmd) ou mieux gitbash.

1. [Récupérer le projet](https://github.com/DanYellow/cours/raw/refs/heads/main/s5-developpement-front/s5-developpement-front-sae-501.ressources.zip)
2. Installer les dépendances

    ```sh
    npm install
    ```

### Utilisation - Mode développement

1. Lancer le serveur

    ```sh
    # La commande va lancer les serveurs express et vite
    npm start
    ```

    > Note : Le serveur de développement est plus lent que le serveur de production. Il intégère des outils qui ne sont pas présents en production. Si vous n'êtes pas sûr(e) des performances de votre site, n'hésitez pas à passer en production pour tester.

Par défaut, le site tourne sur le port Hy, mais vous pouvez le changer grâce à un fichier env/.env.dev.local (voir fichier env/.env.dev.dist pour exemples).
Le serveur se relance à chaque modification de fichiers et rafraîchit également le navigateur. De plus, le serveur est exposé sur le réseau, vous pouvez donc accéder au projet depuis n'importe quel appareil sur le même réseau, ça sera pratique pour tester le mode responsive sur vos terminaux mobiles.

> **N'éditez pas le fichier env/.env.dev.dist, faites-en une copie que vous nommerez .env/.env.dev.local.** Une bannière d'alerte sera affichée si vous ne créez pas de fichier env/.env.dev.local.

#### Docker - développement

Le projet gère également Docker en développement. Si vous le souhaitez, vous pouvez l'utiliser avec la commande suivante :

```bash
docker compose --env-file ./env/.env.dev.local up
```

> Si vous n'aimez pas voir tous les logs de docker compose dans le Terminal, vous pouvez ajouter le paramètre `-d`.

Notez quand même les points suivants :

- La commande `docker compose` échouera si un des fichiers .env, listé dans la commande, est inexistant
- Si vous souhaitez utiliser Docker pour gérer MondoDb (au lieu d'une base MongoDb locale ou Atlas), vous pouvez copier et renommer le fichier `docker-compose.override.example.yml` en `docker-compose.override.yml`
  - Il faudra changer l'url de MongoDb dans le fichier .env (il y a un exemple dans le fichier .env.dev.local)
- Les images Docker peuvent être très lourdes, si vous avez un espace disque limité, évitez de l'utiliser. Les images Docker de node + mongodb pèsent ensemble 4 GB

> Pour arrêter le processus de docker composer, vous pouvez utiliser <kbd>ctrl</kbd> + <kbd>c</kbd>. En revanche, si vous avez besoin d'un arrêt plus propre ou que vous avez lancé le processus en arrière-plan (paramètre `-d`), il faut utiliser la commande `docker compose down`.

### Utilisation - Mode production

> **Le projet sera testé en mode production. Veillez bien à tester que tout fonctionne dans ce mode avant de rendre le projet.**

1. Compiler les assets gérés par vite

    ```sh
    # La commande va compiler les assets vite dans le dossier dist/
    npm build
    ```

2. Lancer le serveur de production

    ```sh
    npm prod
    ```

    Même s'il y a une tâche de production, vous ne serez pas en capacité d'uploader votre site chez un hébergeur, par défaut, ils ne gèrent pas nodejs, et le déploiement de projets node nécessite quelques modifications supplémentaires que nous n'aurons pas l'occasion de voir. Cependant, si vous souhaitez le faire, vous avez les solutions suivantes :

- [localtunnel](https://localtunnel.github.io/www/) : Outil gratuit permettant d'exposer sur le web votre serveur local temporairement
- Glitch : Outil freemium permettant de déployer un site nodejs à partir de GitHub. Le site mdn propose un didacticiel (en anglais) pour déployer votre site avec Glitch et MongoDB Atlas (freemium).
  - [Accéder au didactiel pour déployer avec Glitch - anglais](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
  - [Accéder au didactiel pour MongoDB Atlas - anglais](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database)
  - Alwaysdata : Parmi les serveurs proposés, l'hébergeur propose également nodejs. **Toutefois, seule la partie serveur est proposée.** Pour la partie Mongo, le plus simple est de passer par MongoDB Atlas (freemium) (voir plus haut). Néanmoins, il est possible d'installer soi-même MongoDB en SSH à condition d'avoir de la place sur votre espace disque
    - [Accéder au didacticiel pour installer MongoDB sur AlwaysData](https://help.alwaysdata.com/fr/guides/mongodb/)
            > - Note : Si vous utilisez la version gratuite d'Alwaysdata, l'espace disque sera trop petit pour héberger votre projet. Les dépendances de node seront trop lourdes. Ainsi, il est préférable d'utiliser la commande `npm install --omit=dev` pour installer uniquement les dépendances dont vous avez besoin en production. Cette astuce s'applique pour n'importe quel serveur node en production.
            > - Note 2 : Contrairement à ce que laisse penser l'adminstration d'alwaysdata, selectionner une version de node, ne l'applique pas quand vous effectuez des commandes en ssh (vous devrez faire npm install, vous-même). Si vous souhaitez utiliser une version spécifique de node, il faudrait la préfixer avec la variable d'environnement `NODEJS_VERSION`. Par exemple `NODEJS_VERSION=21 npm install` pour utiliser la version 21.X.X de nodejs.

> Si vous utilisez MongoDB Altas, vos identifiants de connexion se trouvent dans l'URL. Ex `mongodb+srv://your_user_name:your_password@cluster0.cojoign.mongodb.net/...`. **Vous ne devez en aucun cas mettre "your_user_name" et "your_password" dans votre dépôt, c'est une faille de sécurité grave.** Ces valeurs doivent être dans un fichier .env. Utilisez la valeur `MONGODB_URL` dans les fichiers .env.local qui ne sont pas commités

#### Docker - production

Vous pouvez également utiliser Docker en mode production avec une commande qui varie un peu :

```bash
docker compose --env-file ./env/.env.prod.local --file docker-compose.prod.yml --file docker-compose.override.yml up
```

> `--file docker-compose.override.yml` est à rajouter que si et seulement si vous souhaitez utiliser Docker pour la gestion de MongoDB.
>
> Le fait d'avoir deux fois le paramètre `--file` permet de fusionner les fichiers docker-compose. Pour le développement, on ne le fait pas car Docker fusionne automatiquement `docker-compose.yml` avec `docker-compose.override.yml`.

A noter que si vous avez utilisé Docker précédemment dans un environnement différent de celui que vous allez utiliser (prod vers dev, ou l'inverse). Il faudra arrêter les containers et ses volumes pour éviter que Docker s'enmêle les pinceaux entre les dépendances de développement et de production avec la commande suivante (à adapter) :

```bash
docker-compose -f docker-compose.yml  --env-file ./env/.env.dev.local down --volumes --remove-orphans
```

## Tâches à effectuer
- [x] Lire les consignes
- [X] [Télécharger le code de départ la SAE](https://github.com/DanYellow/cours/raw/refs/heads/main/s5-developpement-front/s5-developpement-front-sae-501.ressources.zip)
- [X] Installer les dépendances [(voir partie "mise en place")](#mise-en-place)
- [X] S'approprier le code, faire des tests comme ajouter de nouvelles routes et pages...
- [X] Initialiser le projet sur GitHub [(voir partie "utilisation de git")](#utilisation-de-git)
- [X] **Ne pas modifier la page "a-propos", elle est complète et déjà responsive**
- [ ] Terminer les fonctionnalités implicites. Exemple : corriger les liens qui vont vers des 404, etc. **Cette tâche est traitée par celui qui tombe dessus**
- [ ] Respecter les normes d'accessibilité web (font-size en rem, contrastes...)
  - Quand vous utilisez la pseudo-classe ":hover", pensez toujours à mettre également la pseudo-classe ":focus-visible"
    - Il y a le modifier tailwind ":hocus" qui réunit les deux, il y a également un modifier tailwindcss "hocus:" qui remplit le même rôle. Il fonctionne également pour les groupes
  - **Votre score d'accessibilité Lighthouse (navigateur Chromium seulement) doit être supérieur ou égal à 85 en mode production.** Je prendrai deux pages au hasard de la partie front et lancerai un test (mobile et PC).
    - [Voir utilisation de Lighthouse](https://developer.chrome.com/docs/lighthouse/overview?hl=fr)

### Yves

- [ ] Gérer la date des journées portes ouvertes (affichée dans la page d'accueil du site BUT) depuis le backoffice qui lira/modifiera un fichier json
  - Le fichier n'existe pas, vous devez le créer dans le dossier src/data pour que son contenu puisse être lu dans les templates
  - La documentation de Nodejs propose des exemples pour lire/éditer un fichier json (préférez la version avec async / await) :
    - [Lire un fichier](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs)
    - [Ecrire un fichier](https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs)
      - Note : Vous devez impérativement transformer le contenu à écrire en chaîne de caractères avant de l'écrire dans le fichier
- [ ] Afficher en "temps réel" le nombre de caractères dans la balise &lt;textarea>
  - Lors de l'édition d'une SAE, il y a une limite de caractères, indiquez à l'utilisateur le nombre de caractères restants
- [ ] Permettre de créer, éditer un article
  - Toutes les routes d'API sont déjà prêtes pour manipuler la base de données. Il faut créer les pages associées
  - **Le champ permettant l'upload d'images doit impérativement s'appeller "image" (attribut "name"), sinon ça ne fonctionnera pas**
  - La suppression et le listage sont déjà gérés
  - Lorsqu'un lien YouTube est placé, vous devez afficher le lecteur YouTube
    - Vous devez vérifier que le lien ou l'id de la vidéo est valide
    - Pour permettre un chargement plus rapide de la page, ajoutez l'attribut `loading="lazy"` à l'iframe. Ainsi le lecteur YouTube s'affichera quand elle sera visible
      - [En savoir plus sur le lazy loading des &lt;iframe>](https://web.dev/articles/iframe-lazy-loading)
  - Inspirez-vous de ce qui a déjà été fait pour la partie SAE, partie qui est complète
  - La gestion de l'auteur doit être réalisée avec la balise &lt;datalist> ou un plugin comme TomSelect ou choicesjs (pas installé et à préférer)
- [ ] Ajouter une validation côté client des formulaires (SAE, Auteur et Article)
  - Vous pouvez utiliser un outil comme [zod.js](https://zod.dev/) (déjà installé, voir `code/database/models/author.js`)
  - Dépendamment de l'outil, **vous devrez écouter un évènement pour la validation du formulaire**
- [ ] Proposer un système de thème au niveau des couleurs dans l'administration. Présentement tout tourne autour du bleu, proposez un moyen de changer la couleur pour chaque utilisateur
  - **Vous ne devez pas utiliser une base de données pour stocker la valeur**
  - Pour rendre les choses les plus simples possibles, vous ne proposerez que les [couleurs listées par tailwind](https://tailwindcss.com/docs/customizing-colors)
  - Changer la valeur de la balise [meta "theme-color"](https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta/name/theme-color) en fonction du background-color de l'écran
- [ ] Permettre, de façon asynchrone, d'ajouter un commentaire à un article et l'afficher
  - Pour gérer les messages plus facilement, aidez-vous de la balise &lt;template>
- [ ] Ajouter une page affichant en détails un auteur
  - Cette page n'existe pas, à vous de faire le design
  - Il y a déjà une url pour récupérer ces informations (voir swagger ou postman)
  - La couleur de la bulle change en fonction de l'auteur (optionnel)

  



### Abdel

- [ ] Gérer l'erreur 404
  - Il existe moult didacticiels en ligne qui montrent comment gérer ceci avec express. Attention : votre route de 404 doit être la dernière route de l'ensemble de **toutes** vos routes, sinon, celles qui suivront ne seront jamais appelées
  - [Liste inspiration design pages 404](https://www.designspells.com/?tag=404)
- [ ] Ajouter une section "Messages" (titre indicatif) sur la page d'accueil de l'administration listant les cinq derniers messages envoyés depuis le formulaire de contact
  - Cette route est gérée dans le fichier `server/back-end-router/index.js`, il faudra la compléter
- [ ] Afficher les messages envoyés depuis le formulaire de contact
  - Il n'y a pas de schéma pour les messages, nous le réaliserons ensemble
    - L'administration ne doit permettre que de lister les messages (GET) et le site front juste d'envoyer un message (POST)
  - Vous devez créer les api pour (POST et GET)
  - N'oubliez pas d'ajouter les routes pour accéder aux messages depuis l'administration dans le dossier `./server/back-end-router/`
- [ ] Permettre de créer, éditer, supprimer un auteur et lister les auteurs
  - Toutes les routes d'api sont déjà prêtes pour manipuler la base de données. Tout comme le routeur, à vous de le connecter au reste.
  - **Le champ permettant l'upload d'images doit impérativement s'appeller "image" (attribut "name"), sinon ça ne fonctionnera pas**
  - Inspirez-vous de ce qui a déjà été fait pour la partie SAE, partie qui est complète
- [ ] Afficher le détail d'un message dans une page dédiée
- [ ] Mettre les membres du groupe dans le pied de page (fichier `src/layouts/back-end/base.njk`)
- [ ] Permettre l'activation / désactivation d'un article depuis la liste des articles
- [ ] Afficher le nom des membres de l'équipe (site BUT et/ou administration)
- [ ] Sur la page contact, vous devez gérer de façon asynchrone l'envoi du message depuis le formulaire
  - **La page ne doit pas se recharger lors de la soumission du formulaire**
  - Il faudra utiliser fetch, api native de javascript qui permet de faire des requêtes asynchrones



### Bassem

- [ ] Compléter l'intégration à partir de la maquette Adobe XD
  - [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)
  - Vous devez utiliser nunjucks, un gabarit de base (`src/layouts/front-end/base.njk`) est là pour vous aider
  - La page "a-propos" est déjà faite. **Pas besoin de la modifier**
  - N'oubliez pas d'ajouter les routes pour accéder à vos pages dans le fichier `server/front-end-router.js` et modifier les liens de navigation dans le fichier `src/data/menu.json`
    - La valeur de l'attribut "href" doit être le premier paramètre du router. Exemple :

    ```js
    router.get("/formation", async (req, res) => {
        /* [...] */
    });
    // Dans le code ci-dessus, on définit une route ayant pour chemin "/formation".
    // Pour y accéder depuis une balise <a>, il faudra mettre comme valeur "/formation" pour l'attribut "href", et ce, même si le fichier nunjucks s'appelle "training.njk"
    ```
- [ ] Rendre le site responsive (tailwind est là pour vous aider)
  - Il n'y a pas de maquette responsive, à vous de vous adapter. Utilisez votre expérience ainsi ce que vous avez vu en cours pour proposer la meilleure expérience possible
  - [Accéder à la documentation des modifiers responsive de tailwindcss](https://tailwindcss.com/docs/responsive-design)
- [ ] Mettre un favicon
  - Il n'a pas besoin d'être géré par vite, mettez-le dans le dossier /public
  - Il peut être différent entre le site BUT et l'administration
- [ ] Permettre à l'utilisateur mobile de changer de page grâce à la liste déroulante présente pour la pagination
  - Les listes déroulantes sont déjà présentes, il ne manque plus que l'interactivité avec le javascript
- [ ] Chaque page à une valeur de &lt;title> unique
  - Si la valeur n'est pas présente, il est indiqué "TITRE MANQUANT" dans le navigateur
  - Il y a un bloc nunjucks `{% block title %}{% endblock %}` dédié dans les gabarits de base du dossier `layouts/`. Utilisez-le.
- [ ] Afficher les détails d'un article quand on clique dessus depuis la page d'accueil
  - titre, chapo, contenu, image, video YouTube
  - Afficher le nom de l'auteur (mettre une valeur par défaut si un article n'a pas d'auteur) avec un lien vers le détail de l'auteur listant tous ses articles
  - Note : Pour la vidéo YouTube, elle est facultative, toutefois vous devez permettre à l'utilisateur de mettre l'URL de la vidéo, l'url d'iframe ou juste l'id de la vidéo
  - Note 2 : N'oubliez pas que YouTube propose également des shorts, on doit également pouvoir les utiliser
- [ ] Indiquer dans la navigation la page courante et changer la couleur de la bulle en fonction de la page
  - Il faudra utiliser une variable nunjucks
  - Des classes ont déjà été définies dans le fichier `src/styles/hero.css`, libre à vous de les utiliser
  - Note : Une fonctionnalité semblable est déjà présente dans la partie admin, inspirez-vous en.
- [ ] Afficher la liste des articles **actifs** sur la page d'accueil
  - Pour rappel, vous avez déjà le code pour, les articles sont déjà injectés dans la page d'accueil (`src/pages/front-end/index.njk`), il faut juste les afficher
- [ ] Mettre en place un système de pagination pour les articles sur la page d'accueil
- [ ] **Sans javascript**, afficher une barre de progression sur les articles au fur et à mesure de la lecture grâce à la propriété CSS [animation-timeline](https://developer.mozilla.org/fr/docs/Web/CSS/animation-timeline)
  - Google propose un exemple sur son site. [Voir exemple](https://developer.chrome.com/docs/css-ui/scroll-driven-animations?hl=fr#demo_reading_progress_indicator)
  - [Vous avez un autre exemple sur le site scroll-driven-animations.style](https://scroll-driven-animations.style/demos/progress-bar/css/)
    - Ce site contient plein d'exemples concernant cette nouvelle API très pratique
  - Note : A l'heure actuelle, ceci ne fonctionne que sur Chrome, gérez que ce navigateur

## Utilisation de Git : Règles de nommage

Pour garantir un historique propre, lisible et faciliter le travail en équipe sur le projet, merci de respecter les conventions suivantes pour le nommage des branches et des commits.

## Nommage des branches

Les branches doivent être écrites en minuscules avec des mots séparés par des tirets (`kebab-case`). Elles doivent suivre le format :

``type/nom-developpeur/description-courte``

ou simplement

``type/description-courte``

### Types de branches :

- ``feat/`` : Nouvelle fonctionnalité (ex: ``feat/bassem/integration-accueil``, ``feat/systeme-commentaires``)
- ``fix/`` : Correction de bug (ex: ``fix/yves/erreur-validation-zod``, ``fix/lien-404-navigation``)
- ``style/`` : Modifications graphiques, CSS/Tailwind ou responsive (ex: ``style/theme-couleurs``, ``style/responsive-pagination``)
- ``refactor/`` : Restructuration du code sans ajout de fonctionnalité (ex: ``refactor/backend-routes``)
- ``docs/`` : Documentation ou mise à jour du README (ex: ``docs/regles-git``)
- ``chore/`` : Tâches diverses, dépendances, configuration (ex: ``chore/maj-packages``)

### Bonnes pratiques :

- Créez toujours une branche à partir de main à jour.
- Supprimez votre branche distante une fois votre Pull Request / Merge Request validée et fusionnée.

## Convention des messages de commit 

Les messages de commit doivent être explicites et suivre la norme **Conventional Commits** :

``type(scope-optionnel): description au présent/impératif``

### Types autorisés :

| Préfixe | Utilisation | Exemple |
| --- | --- | --- |
| feat | Ajout d'une nouvelle fonctionnalité | `feat(front): afficher les articles actifs sur l'accueil` |
| fix | Résolution d'un bug | `fix(sae): corriger la limite de caractères du textarea` |
| style | Style, design, mise en page (CSS/Tailwind) | `style(nav): ajouter la gestion de focus-visible` |
| refactor | Refonte de code sans changement de comportement | `refactor(api): simplifier les routes d'auteurs` |
| docs | Ajout ou modification de documentation | `docs(readme): ajouter les règles de nommage git` |
| test | Ajout ou modification de tests | `test(models): ajouter validation zod pour author` |
| chore | Maintenance, configuration Docker/Vite/npm | `chore: installer zod et configurer vite` |
  
## Notes et astuces

- [Accéder au document dédié aux astuces](https://raw.githubusercontent.com/DanYellow/cours/refs/heads/main/s5-developpement-front/sae-501/ASTUCES.md)

## Documentation

Voici une liste non exhaustive des documentations des divers technologies utilisées dans le projet :

- [luxon](https://moment.github.io/luxon/)
- [express v4.x](https://expressjs.com/en/4x/api.html)
- [mongoose](https://mongoosejs.com/)
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [multer](https://expressjs.com/en/resources/middleware/multer.html)
- [zod](https://zod.dev/)
