
const mealInput = document.querySelector('#meal');
const results = document.querySelector('#results');

document.querySelector('button').addEventListener('click', getMeal);

function getMeal() {
    const mealName = mealInput.value.trim();

    if (mealName === '') {
        results.textContent = 'Please enter a meal.';
        return;
    }

    results.textContent = 'Loading...';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(mealName)}`)
        .then(res => res.json())
        .then(data => {

            if (!data.meals || data.meals.length === 0) {
                results.textContent = 'No meals found.';
                return;
            }

            // Display the first matching meal.
            const meal = data.meals[0];

            // Create a list of ingredients.
            let ingredients = '';

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== '') {
                    ingredients += `<li>${measure || ''} ${ingredient}</li>`;
                }
            }

            
            results.innerHTML = `
                <div class="meal-card">
                    <h2>${meal.strMeal}</h2>

                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                    <p><strong>Category:</strong> ${meal.strCategory}</p>
                    <p><strong>Cuisine:</strong> ${meal.strArea}</p>

                    <h3>Ingredients</h3>
                    <ul>${ingredients}</ul>

                    <h3>Instructions</h3>
                    <p class="instructions">${meal.strInstructions}</p>
                </div>
            `;
        })
        .catch(error => {
            results.textContent = 'Something went wrong.';
            console.log(error);
        });
}
