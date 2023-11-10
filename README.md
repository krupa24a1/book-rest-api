# book-rest-api

<!-- API endpoints and their usage -->
<!-- Note: Replace {port} with actual port on which server is running -->
GET     -   localhost:{port}/api/v1/books      - get all books
GET     -   localhost:{port}/api/v1/books/:id  - get a specific book based on id
POST    -   localhost:{port}/api/v1/books      - create a book
PUT     -   localhost:{port}/api/v1/books/:id  - update a specific book based on id
DELETE  -   localhost:{port}/api/v1/books/:id  - delete a specific book based on id

<!-- Instructions to set up and run the application locally -->
1. npm install
2. setup a .env file with below mentioned details
  -> PORT
  -> MONGO_URI (mongodb://localhost:27017 - if local mongodb server is used)
3. npm start

<!-- Any decisions or assumptions you made during the development process -->
Since only the database is mentioned as mongodb, I have used mongodb driver for nodejs instead of using mongoose.