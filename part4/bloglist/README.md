# Exercise Information

FullStack Open - Part 4

- Structure of backend application, introduction to testing: Exercises 4.1-4.7

## Steps:

**Exercise 4.1-4.2**

1. `npm init`
2. install dependencies
    core:
    - express
    - mongoose
    - dotenv
    - cors
    dev:
    - eslint
    - nodemon
3. create models/bloglist for database schema model (BlogList model - collection auto-named bloglists)
4. create utils/config for environment variables
5. test code from exercise 4.1
    - database connection, successful
    - add blog entry, successful
6. create controllers/bloglists for request handling logic
7. create app.js for express app configuration and db connection
8. index.js is now just an entry point and for starting the server