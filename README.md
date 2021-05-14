# Movie Recommendation site
# Frontend
The frontend is built using React(Hooks), Entire react app is Wrapped around a context api, that keep track of the state in the application. <br />
The front end has Seven pages<br />
<ol>
  <li>Top Movies</li>
  <li>Recommended Movies</li>
  <li>Review</li>
  <li>Login</li>
  <li>Signup</li>
  <li>PageNotfound</li>
</ol>
Top Movies page provides a list of movies with highest imbd rating
<br />
Recommended Movies page has the recommended movies for the user
<br />
Login page for the user to login, and sign up page to register

# Backend
The backend is build using Node and express, There are Four routes
<br />
<ol>
<li>AutoComplete Route</li>
<li>Movie Route</li>
<li>Search Route</li>
<li>Auth Route</li>
</ol>
We are using jwt for session management, Hotel Router has all the CRUD operation routes, User Router is used for login and signup routes, Review Router is used to add or remove reviews.

# Database
Mongodb is used as the database for this project
