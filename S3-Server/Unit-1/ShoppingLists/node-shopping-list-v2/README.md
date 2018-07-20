Shopping list v2
================

https://github.com/Thinkful-Ed/node-shopping-list-v2

Now it's your turn. Using your cloned repo of shopping list v2 as your starting point, follow the pattern we've established for POST requests to /shopping-list, and create a POST endpoint for /recipes.

When clients make a POST request to /recipes with the right data, the server should create a new recipe (using Recipes.create()), and it should return a JSON object representing the newly-created recipe. Your endpoint should also validate all requests. If a client makes a POST request to /recipes that does not contain the recipe name, for instance, the server should log an error and respond with an error HTTP status code and a helpful message.