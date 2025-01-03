let recipeObject

let recipes = [
    {
        id: 1,
        title: "Gløgg",
        picture_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
        ingredients: [
          { NAME: "Orange zest", AMOUNT: "0.5" },
          { NAME: "Water", AMOUNT: "200 ml" },
          { NAME: "Sugar", AMOUNT: "275 g" },
          { NAME: "Whole cloves", AMOUNT: "5" },
          { NAME: "Cinnamon sticks", AMOUNT: "2" },
          { NAME: "Spice", AMOUNT: undefined },
          { NAME: "Bottle of red wine", AMOUNT: "1" },
          { NAME: "Raisins", AMOUNT: "100 g" },
          { NAME: "Slipped Almonds", AMOUNT: "50 g" },
        ],
        description: "Mix everything, heat it, and you are good to go!",
    },
    {
        id: 2,
        title: "Chiffon Cake",
        picture_url:
          "https://preppykitchen.com/wp-content/uploads/2021/11/Chiffon-Cake-Recipe-Card.jpg",
        ingredients: [
          { NAME: "Flour", AMOUNT: "60 g" },
          { NAME: "Milk", AMOUNT: "40 g" },
          { NAME: "Sugar", AMOUNT: "65 g" },
          { NAME: "Oil", AMOUNT: "30 g" },
          { NAME: "Eggs", AMOUNT: "4" },
        ],
        description: "Bake 50 minutes with 180 degree!",
    },

]; 


function showAllRecipes(){
    const recipeItemElement = document.getElementById("saved-recipes");
    recipeItemElement.innerHTML = "";

    recipes.forEach(recipe => {
        showRecipe(recipe);
    });
}

function addRecipe(event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const picture_url = document.getElementById('image-link').value;
    
    const ingredients = [];
    const ingredientNames = document.querySelectorAll("input[name='ingredient_name']");
    const ingredientAmounts = document.querySelectorAll("input[name='ingredient_amount']");
    for(let i = 0; i < ingredientNames.length; i++) {
        const name = ingredientNames[i].value;
        const amount = ingredientAmounts[i].value;
        ingredients.push({NAME: name, AMOUNT: amount});
    }

    const description = document.getElementById('description').value;

    const newRecipe = {
        id: recipes.length + 1,
        title,
        picture_url,
        ingredients,
        description
    };

    recipes.push(newRecipe);
    showAllRecipes();

    document.getElementById("recipe-form").reset();
    
}

function addMoreIngredient(event){
    event.preventDefault();

    const moreIngredientElement = document.getElementById("containerForIngredient");

    const moreIngredientToAdd = document.createElement("div");
    moreIngredientToAdd.classList.add("ingredient-item");
    

    const moreIngredientName = document.createElement("input");
    moreIngredientName.setAttribute("name", "ingredient_name");
    moreIngredientName.type = "text";
    moreIngredientName.placeholder = "Ingredient Name";
    moreIngredientToAdd.appendChild(moreIngredientName);

    const moreIngredientAmount = document.createElement("input");
    moreIngredientAmount.setAttribute("name", "ingredient_amount");
    moreIngredientAmount.type = "text";
    moreIngredientAmount.placeholder = "Amount";
    moreIngredientToAdd.appendChild(moreIngredientAmount);

    moreIngredientElement.appendChild(moreIngredientToAdd)
}



const addIngredientButton = document.getElementById('add-ingredient')
addIngredientButton.addEventListener('click', addMoreIngredient);


const addRecipeButton = document.getElementById('add-recipe')
addRecipeButton.addEventListener('click', addRecipe);

function searchRecipes() {
    const searchKeyword = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchKeyword) ||
        recipe.description.toLowerCase().includes(searchKeyword) ||
        recipe.ingredients.some(ingredient => ingredient.NAME.toLowerCase().includes(searchKeyword)) 
    );

    const recipeItemElement = document.getElementById("saved-recipes");
    recipeItemElement.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        showRecipe(recipe);
    });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', searchRecipes);



function showRecipe(recipe){
    const recipeItemElement = document.getElementById('saved-recipes');

    const recipeContainer = document.createElement("div");
    recipeContainer.classList.add("recipe-item");
    
    const recipeTitle = document.createElement("h3");
    recipeTitle.textContent = recipe.title;
    recipeContainer.appendChild(recipeTitle);

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.picture_url;
    recipeImage.alt = `${recipe.title}-img`;
    recipeContainer.appendChild(recipeImage);

    const recipeIngredientsHeader = document.createElement("h4")
    recipeIngredientsHeader.textContent = "Ingredients:";
    recipeContainer.appendChild(recipeIngredientsHeader);

    const recipeIngredientsList = document.createElement("ul");
    for(let ingredient of recipe.ingredients) {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = `${ingredient.NAME} ${ingredient.AMOUNT}`;
        recipeIngredientsList.appendChild(ingredientItem);
    }
    recipeContainer.appendChild(recipeIngredientsList);

    const recipeDescription = document.createElement("p");
    recipeDescription.textContent = recipe.description;
    recipeContainer.appendChild(recipeDescription);

    
    recipeItemElement.appendChild(recipeContainer)
}

showAllRecipes();

