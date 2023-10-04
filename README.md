# Site
The site is using SPA approach, to get a feeling of fast updates when interacting with the application.

Its a simple application, which contains many fiction artists. You can search for artists using both default search functionality, as well as semantic search.

Try to search for "Metallica", "Mozart", and "Rihanna" using first "default" and then "semantic" to see the difference.

"Semantic search" is using a language model, which will understands the context of the search. This is why you will get relevant hits using "semantic", even if the word doesn't exist in the content.

# Setup

## Nodejs 18.4.1 or later
Install / update nodejs to use version 18.4.1 or later: https://nodejs.org/en/download/

Verify the version using node --version

## Install dependencies
Open Visual Studio code and go to the folder where you have this project. Run
yarn install

# Start application
yarn dev

## Add GraphQL file
1. Add a new file with extension .graphql under src/graphql
2. Run "yarn generate" to update "generated.ts" with types from query
3. You can now use the generated query using "useX" where X is the graphql query name

## Update a GraphQL file
Update the graphql file and run "yarn generate" after saved the change.

## Vercel
The main branch is automatically deployed to Vercel. You can check it out at: https://music-festival-2024-nextjs.vercel.app/