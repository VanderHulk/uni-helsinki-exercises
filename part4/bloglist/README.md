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

**Exercise 4.3-4.7**

9. create utils/list_helper.js
10. define dummy function that receives an array of blog as a parameter, always returns the value 1
11. create tests/dummy.test.js
12. verify test configuration, worked
13. create helper functions for analyzing blog data:
    - dummy, returns the constant value 1 regardless of input
    - totalLikes, calculates the total number of likes across all blog entries
    - favoriteBlog, returns the blog with the highest number of likes
    - mostBlogs, determines the author with the highest number of blog posts and returns both the author and count
    - mostLikes, determines the author whose blogs have the highest total number of likes and returns both the author and total likes