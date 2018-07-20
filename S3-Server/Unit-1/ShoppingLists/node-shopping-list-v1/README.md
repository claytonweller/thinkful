# Node shopping list v1


[GitHub](https://github.com/Thinkful-Ed/node-shopping-list-v1) | [Glitch](https://glitch.com/edit/#!/node-shopping-list-v1) 

Now it's your turn. Using your cloned shopping list v1 repo as your starting point, follow the pattern we've established for GET requests to /shopping-list, and create a GET endpoint for /recipes.

As with /shopping-list, you'll want to add a couple of recipes to the model when the server starts. To add a recipe, do Recipes.create('chocolate milk', ['cocoa', 'milk', 'sugar']), where the first argument is the recipe name, and the second is an array of ingredients.

When clients make a request to /recipes, the server should return a JSON array of objects representing all currently stored recipes.