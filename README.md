# INST377-FinalProject-Hutchinson
INST377 Final Project - Alyssa Hutchinson, Spring 2026

This application provides meal ideas based on different criteria, and allows users to save favorite meals for times when there is no inspiration on what to cook, or when they have limited groceries. The main audeince is college students or anyone with a very busy or variable schedule. With such busy and changing schedules, it’d be easy for this group of people to easily find meals based on their specific preferences, making it all easily accessible and quick in one place.

Target Browsers: iOS or Android, any Windows Browsers 
# How to Install
1. Create a new repository. 

2. Clone new and this repository in VS Code (git clone https://github.com/alyssahutchinson/INST377-FinalProject-Hutchinson.git)

3. Create a package.json file. (Using npm install) 

4. Open the integrated terminal and install Node modules. (npm install node)

5. Create "public" folder within cloned repository folder (all lowercase).

6. Copy in files from this cloned repository into personal.

## How to run the application
Paste the Vercel link into your browser to run locally on your device:  https://inst-377-final-project-hutchinson.vercel.app/


## *No tests were written for this

## API
The API for this application is The Meal DB (https://www.themealdb.com/api.php). This API provides meal ideas, areas, and images for recipe ideas, allowing for filtering by ingredients, category, direct search, etc. 

GET - Retrieves page for the first shown instance of the application through the server. 
 
GET (2nd instance)- Retrieves data from the SUPABASE database, showing all saved favorite meals. 

POST - Adding a user-inputted favorite meal into the SUPABASE database of favorite meals. 

## Bugs and Future Implementations 
__Bugs:__
Pie Chart may not always come up in the center of page, or as accurate with favorites chart data.

__For the Future:__
This application, with further development, would allow users to get random meal ideas in a 'feeling lucky' sense. More development would also allow for more analysis of favorites shown to the user, and more imagery use. 
