# CRUD Web Application

## Steps for running this project

1) Download this project folder in vscode.
2) Run command npm install.
3) Create database with name, " User_DB "
4) Create collections as User and products.
5) Import the database json collections files from Database folder.
6) In .env file give your  mongodb database path, DB_URI = mongodb://localhost:27017/User_DB
7) In package.json file, add the following line in scripts.
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  }, 

 8) Run final command npm start.
