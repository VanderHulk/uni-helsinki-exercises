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

**Exercise 4.8-5.12**

14. `npm install cross-env` - used to set NODE_ENV cross-platform (OS)
15. define the execution mode of the application with NODE_ENV environemtn variable in package.json
16. refactor utils/config.js
17. set separate variables in .env file for testing and for development
18. `npm install --save-dev supertest`
19. create JSON array for testing (tests/test_helper.js)
20. create blog_api.test.js
    - uses SuperTest to make API requests
    - uses .then() for asynchronous handling
    - sets up test database with beforeEach
    - verifies response from /api/blogs
21. refactor blog_api.test.js to use async/await

---

**FOR REFERENCE AND LEARNING PURPOSES**

.then() version

```javascript
beforeEach(() => {
    return BlogList.deleteMany({})
      .then(() => {
        console.log('BlogList cleared')
        const blogObjects = helper.initialBlog
          .map(blog => new BlogList(blog))
        
        const promiseArray = blogObjects.map(blog => blog.save())
        return Promise.all(promiseArray)
      })
})

test('amount of blogs returned', () => {
    return api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        const blogArray = response.body
        console.log('response.body:', blogArray)
        assert.strictEqual(blogArray.length, helper.initialBlog.length)
      })
})

after(() => {
    return mongoose.connection.close()
      .then(() => {
        console.log('connection closed')
      })
})
```
