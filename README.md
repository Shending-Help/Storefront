# Storefront Backend Project

**Port number for db and server:**

    the server is running on port 3000  localhost:3000
    the db is running on port 5432

**Environment variables:**

    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=store
    POSTGRES_TEST_DB=test

    POSTGRES_USER= <-- your user here -->
    POSTGRES_PASSWORD= <-- your password her -->
    SALT_ROUNDS= <-- your salt rounds here -->
    BCRYPT_PASSWORD= <-- your bcrypt password here -->
    TOKEN_SECRET= <-- your token secret here -->
    ENV=dev

**Package installation instructions:**
these are the instructions for installing the packages needed for the backend
npm i express --> this is the express package that will be used to create the server
npm i jsonwebtoken --> this is the jsonwebtoken package that will be used to create the tokens
npm i bcrypt --> this is the bcrypt package that will be used to hash the passwords
npm i cors --> this is the cors package that will be used to allow cross-origin requests
npm i db-migrate --> this is the db-migrate package that will be used to create the migrations
npm i dotenv --> this is the dotenv package that will be used to read the environment variables
npm i jasmine --> this is the jasmine package that will be used to run the tests
npm i jasmine-spec-reporter --> this is the jasmine-spec-reporter package that will be used th help the tests run
npm i morgan --> this is the morgan package that will be used to log the requests
npm i pg --> this is the pg package that will be used to connect to the database
npm i supertest --> this is the supertest package that will be used to test the end points

**Setup db and server instructions:**

#create user and database
`sh CREATE USER <-- your user here --> WITH PASSWORD '<-- your password here -->'; `
#create database
`sh CREATE DATABASE <-- your database here -->; `

#give user access to database
`sh GRANT ALL PRIVILEGES ON DATABASE <-- your database here --> TO <-- your user here -->; `

**scripts to use in the project**
`"dev": "nodemon ./src/index.ts"` --> this is the command to run the server in the dev environment
`"clean": "rimraf build/"` --> this is the command to clean the build folder
`"build": "npx tsc"` --> this is the command to build the project
`"start": "npm run build && nodemon build/index.js"` --> this is the command to start the project
`"format": "prettier --write 'src/**/*.{ts,tsx,js,jsx}'"` --> this is the command to format the code
`"lint": "eslint . --ext .ts"` --> this is the command to lint the code
`"test": "Set ENV=test && db-migrate up && npm run build && Set ENV=test && jasmine && Set ENV=test && db-migrate reset"` --> this is the command to test the project

Database schema with column name and type.

    #### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- username
- password

#### Orders

- id
- user_id
- status

#### Order-Product

- id
- order_id
- product_id

**Endpoints:**

# USERS

    GET /users --> returns all users in the database
    GET /users/:id --> returns a user with the given id
    POST /users --> creates a new user

# PRODUCTS

    GET /products --> returns all products in the database
    GET /products/:id --> returns a product with the given id
    POST /products --> creates a new product

# ORDERS

    GET /orders/:id --> returns an order with the given user_id
    GET  /orders --> returns all orders in the database
    GET /orders/:id --> returns an order with the given id
    POST /orders --> creates a new order
    POST /orders/:id/products --> adds a product to an order
    GET /orders/user/:id --> returns all orders for a user with the given id
