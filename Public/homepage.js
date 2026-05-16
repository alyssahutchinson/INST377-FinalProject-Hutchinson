async function findMeal(e){
    e.preventDefault();

    const input = document.getElementById("inputPhrase").value;
    console.log("Inputted: ", input);

    const searchPhrase = input.trim().replace(/\s+/g, "_");
    console.log("Search Phrase: ", searchPhrase);

    //getting meal ideas by searching a main ingredient (1 main ingredient)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchPhrase}`)
        .then(result => result.json())
        .then(response => {
            console.log(response.meals);

            const divMainRes = document.getElementById("mainResults");
            divMainRes.innerHTML=""; //clears last search result

            response.meals.forEach(meal => {
                divMainRes.innerHTML+= `${meal.strMeal} <br> 
                <div>
                    <img src ="${meal.strMealThumb}" width = "120"> 
                </div>`
                ; //^^^^ have to change to use CSS for image shaping
            });
        })
        .catch(error => console.error(error))
}

async function categoryMeal(e){
    e.preventDefault();

    const searchPhrase = document.getElementById("catInput").value;
    console.log("Search Phrase: ", searchPhrase);

    //getting meal ideas by searching for categories (1 main ingredient)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchPhrase}`)
        .then(result => result.json())
        .then(response => {
            console.log(response.meals);

            const divCatResults = document.getElementById("catResults");
            divCatResults.innerHTML=""; //clears last search result

            response.meals.forEach(meal => {
                final = divCatResults.innerHTML+= `${meal.strMeal} <br> `
                final.onclick = addToFav(meal.strMeal)

            });
        })
        .catch(error => console.error(error))
}