# financereact : First step

App Finance in React - 15/02/2025


EXECUTION SERVER + APPLI
=
# Node.JS (Express)
> node ./api/server.js
  Dans package.json, il faut suppimer cette ligne pour que NODE marche -> "type": "module"

# GraphQL (TypeScript)
> ts-node --esm .\graphQL\graphQLServer.ts
  //-> node.Js Express GraphQL - exécution avec ts-node, car node n'exécute que du .js. Il faut transpiler le .ts en .js pour que node fonctionne... ts-node lit les .ts directement.
  Dans package.json, il faut cette ligne pour que la commande marche -> "type": "module"

# Projet principal (TypeScript)
> npm run start

# GraphQL CodeGen
> npm run codegen


Create REACT environment
=
Create REACT environment in ROOT :
> npx create-react-app financereact

SERVER
=
Create folder .\api

Copy these files :

>.\.env

>.\api\server.js

>.\api\utils.js

>.\api\queries.js

Installing modules :

> npm install odbc

> npm install dotenv



 APPLI
=

Create folders 
>./src/actions

>./src/components

>./src/containers

>./src/models

>./src/reducers

Copy these files :
>./src/actions/personne.js

>./src/components/affButton.js

>./src/components/personne.js

>./src/components/personneForm.js

>./src/containers/personneContainer.js

>./src/containers/personneFormContainer.js

>./src/models/constante.js

>./src/reducers/reducer.js

Replace files App.js
>./src/App.js

>./src/index.js


Installing modules :
> npm install react-redux

> npm install @reduxjs/toolkit

> npm install react-query

> npm install styled-components

EXECUTION :

> npm start

> npm test

> npm run build



 EXTENSIONS CHROME
=
React Developer Tools

Redux DevTools



TypeScript :
npm install -g typescript
npx tsc --init
-> cela va générer le fichier : tsconfig.json
Dans tsconfig.json Vérifier que l'on a les lignes ci-dessous activées pour que les typages manquants soient signalés :
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",  // Indique que vous voulez des modules ES en sortie
    "outDir": "dist",    // Le répertoire où les fichiers JavaScript seront générés
    "esModuleInterop": true, // Important pour la compatibilité CommonJS/ES Modules
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "moduleResolution": "NodeNext"
  },
  "include": ["src/**/*"], // Les fichiers TypeScript à compiler
  "exclude": ["node_modules"]
}

Installer ts-node, c'est node, mais pour du typescript. Comme ça, pas besoin de transpiler le .ts en .js : 
npm install -g ts-node

Dans package.json ajouter pour graphQL qui est du node, mais en ts avec les "imports" au lieu de "module" :
"type": "module"



#Puis installer les bibliothèques pour typescript
npm install --save-dev typescript @types/node
npm i --save-dev @types/react-dom

#Ajout du toaster
npm install react-toastify


#Migration Node.js vers Express
npm install express

Installer body-parser (pour gérer le corps des requêtes POST) 
npm install express body-parser


#Migration Node.js vers GraphQL
npm install graphql express-graphql

codeGen
# Installez les plugins dont vous avez besoin (exemples pour TypeScript)
npm install -D @graphql-codegen/typescript
npm install -D @graphql-codegen/typescript-operations
npm install -D @graphql-codegen/typescript-resolvers
npm install -D @graphql-codegen/typed-document-node
npm install -D @graphql-codegen/cli

npm install prisma-loader
npx graphql-codegen --config codegen.ts

Créer le ficher codegen.ts à la racine
ajouter dans config.json ceci pour faciliter la commande codegen : faire -> npm run codegen exécutera ce qu'il y a dans le script.
"scripts": {
  "codegen": "graphql-codegen --config codegen.ts"
}

Apollo Client pour faire des requêtre GraphQL dans React
npm install @apollo/client graphql
Créer un fichier apollo-client.ts dans /src. Voir fichier avec son contenu.
Ensuite, envelopper l'app avec <AppoloProvider> dans index.tsx


PB Cors entre appli et GraphQL
- Il faut :
npm i cors
npm i --save-dev @types/cors


Lier les schemas dans GraphQL :
npm install @graphql-tools/schema


#Tailwind CSS
npm install react-scripts@5.0.1 --save-dev
npm install typescript@4.9.5 --save-dev
npm install tailwindcss@3.4.17 --save-dev

npx tailwindcss init --> ça génère le fichier tailwind.config.js


créér manuellement le fichier postcss.config.js --> pour fonctionner avec typescript

créer manuellement le fichier src/styles/tailwind.css en ajoutant ça dans le contenu  :
@tailwind base;
@tailwind components;
@tailwind utilities;

npm install -D tailwindcss postcss autoprefixer