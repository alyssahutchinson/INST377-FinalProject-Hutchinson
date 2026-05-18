const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
//const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);
console.log("Supabase url =", process.env.SUPABASE_URL)

app.get('/', (req, res) => {
  res.sendFile('public/Homepage.html', { root: __dirname });
});

//getting data
app.get('/Favorites', async (req, res) => {
  console.log('Attempting to get all fav meals!');

  const { data, error } = await supabase.from('Favorites').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else { 
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});

//adding data
app.post('/Favorites', async (req, res) => {
  console.log('Adding Favorite Meal');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const mealName = req.body.mealName;
  console.log(mealName)
  const mainIngredient = req.body.mainIngredient;
  const foodArea = req.body.foodArea;

  console.log(req.body)
    const { data, error } = await supabase
    .from('Favorites')
    .insert({
      meal_name: mealName,
      main_ingredient: mainIngredient,
      area: foodArea
      
    })
    .select();
    console.log('AREA:',area)

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
