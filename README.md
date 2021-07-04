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
 
 
 ## Project Flow
 
 1) User needs to register in the web application.
 2) After registering, user needs to login by using email-id and password.
 3) In Dashboard page, user can add product from navigation bar.
 4) User can do CRUD operations in the table.
 5) At last user can log out successfully.


## Technology Stack

           "dependencies": {
           
                "bcryptjs": "^2.4.3",
                
                "connect-flash": "^0.1.1",
                
                "dotenv": "^10.0.0",
                
                "ejs": "^3.1.6",
                
                "express": "^4.17.1",
                
                "express-ejs-layouts": "^2.5.0",
                
                "express-session": "^1.17.2",
                
                "mongoose": "^5.12.13",
                
                "multer": "^1.4.2",
                
                "passport": "^0.4.1",
                
                "passport-local": "^1.0.0"
                
            },
            
            
            

