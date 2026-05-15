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


//// Favorites////////////////////////////////
async function addToFav(sentMeal) {
  await fetch(`/Favorites`, {
    method: 'POST',
    body: JSON.stringify({
      meal: sentMeal.value,
    //   lastName: `${document.getElementById('lastName').value}`,
    //   state: `${document.getElementById('state').value}`,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());
  console.log(sentMeal.value)

  await loadCustomerData();
}


async function loadCustomerData() {
  await fetch('/Favorites')
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson);
      const table = document.createElement('table');
      table.setAttribute('id', 'customerInfo');
      // Setting up table Heading Row
      const tableRow = document.createElement('tr');

      const tableHeadingFirstName = document.createElement('th');
      tableHeadingFirstName.innerHTML = 'First Name';

      const tableHeadingLastName = document.createElement('th');
      tableHeadingLastName.innerHTML = 'Last Name';

      const tableHeadingState = document.createElement('th');
      tableHeadingState.innerHTML = 'State';

      tableRow.appendChild(tableHeadingFirstName);
      tableRow.appendChild(tableHeadingLastName);
      tableRow.appendChild(tableHeadingState);

      table.appendChild(tableRow);

      // Adding Data to table
      resultJson.forEach((customer) => {
        const customerTableRow = document.createElement('tr');
        const customerTableFirstName = document.createElement('td');
        const customerTableLastName = document.createElement('td');
        const customerTableState = document.createElement('td');

        customerTableFirstName.innerHTML = customer['customer_first_name'];
        customerTableLastName.innerHTML = customer['customer_last_name'];
        customerTableState.innerHTML = customer['customer_state'];

        customerTableRow.appendChild(customerTableFirstName);
        customerTableRow.appendChild(customerTableLastName);
        customerTableRow.appendChild(customerTableState);

        table.appendChild(customerTableRow);
      });

      const preExistingTable = document.getElementById('customerInfo');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      document.body.appendChild(table);
    });
}