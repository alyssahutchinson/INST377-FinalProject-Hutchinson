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
            
            const grab = document.querySelector(".swiper-wrapper");

            // response.meals.forEach(meal => {
            //      grab.innerHTML += `${meal.strMeal} <br> 
            //     <div class="swiper-slide">
            //         <img src ="${meal.strMealThumb}" width = "120"> 
            //     </div>`
            //     ; //^^^^ have to change to use CSS for image shaping
            // });

            response.meals.forEach(meal => {
                divMainRes.innerHTML+= `${meal.strMeal} <br> 
                <div>
                    <img src ="${meal.strMealThumb}" width = "120"> 
                </div>`
                ; //^^^^ have to change to use CSS for image shaping
            });
            
        })
        .catch(error => console.error(error))

    //  const swiper = new Swiper('.swiper', {
    //         loop: true,
    //         navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //         }
    //     });
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
//// Favorites////////////////////////////////
async function addToFav() {
  await fetch(`/Favorites`, {
    method: 'POST',
    body: JSON.stringify({
      mealName: `${document.getElementById('mealname').value}`,
      mainIngredient: `${document.getElementById('mealIngredients').value}`,
      meal_Area: `${document.getElementById('mealArea').value}`,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());
  //console.log(sentMeal.value)

  await loadFavsData();
}

async function loadFavsData() {
    ingredientsForChart = {}; // ingredient counter for chart
  await fetch('/Favorites')
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson);
      const table = document.createElement('table');
      table.setAttribute('id', 'faoriteMealsTable');
      // Setting up table Heading Row
      const tableRow = document.createElement('tr');

      const tableHeadingMealName = document.createElement('th');
      tableHeadingMealName.innerHTML = 'Meal Name';

      const tableHeadingMealIngredient = document.createElement('th');
      tableHeadingMealIngredient.innerHTML = 'Main Ingredient';

      const tableHeadingArea = document.createElement('th');
      tableHeadingArea.innerHTML = 'Area';

      tableRow.appendChild(tableHeadingMealName);
      tableRow.appendChild(tableHeadingMealIngredient);
      tableRow.appendChild(tableHeadingArea);

      table.appendChild(tableRow);

      // Adding Data to table
      resultJson.forEach((favorite) => {
        const favsTableRow = document.createElement('tr');
        const favTableMealName = document.createElement('td');
        const favTableMealIngredient = document.createElement('td');
        const favTableMealArea = document.createElement('td');

        favTableMealName.innerHTML = favorite['meal_name']; //strMeal?

        //adding up main ingredients for chart
        favTableMealIngredient.innerHTML = favorite['main_ingredient'];
        // if(ingredientsForChart[favTableMealIngredient.innerHTML]){
        //     ingredientsForChart[favTableMealIngredient.innerHTML]++}
        // else{
        //     ingredientsForChart[favTableMealIngredient.innerHTML] = 1;
        // }
        // console.log(ingredientsForChart);


        favTableMealArea.innerHTML = favorite['area'];

        favsTableRow.appendChild(favTableMealName);
        favsTableRow.appendChild(favTableMealIngredient);
        favsTableRow.appendChild(favTableMealArea);

        table.appendChild(favsTableRow);
        // makeChart(Object.keys(ingredientsForChart),Object.values(ingredientsForChart))
      });

    //   const preExistingTable = document.getElementById('customerInfo');
    //   if (preExistingTable) {
    //     preExistingTable.remove();
    //   }

      document.body.appendChild(table);
    });
    //makeChart()
}

// let myChart = null 

const preExistingTable = document.getElementById('myChart');
    if (preExistingTable) {
    preExistingTable.remove();
    }

//chart.js
// function makeChart(sentData, sentLabels){
//     // if(myChart !== null){
//     //     myChart.destroy()
//     // }
//     ingrChart = document.getElementById('myChart');

//     new Chart(ingrChart, {
//         type: 'pie',
//         labels: [
//         'Red',
//         'Blue',
//         'Yellow'
//     ],
//     datasets: [{
//         label: sentLabels,
//         data: sentData,
//         backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 4
//   }]
//     })
// };


 window.onload = function(){
    if (window.location.pathname == "/Favorites.html"){
        loadFavsData();
    }
}
