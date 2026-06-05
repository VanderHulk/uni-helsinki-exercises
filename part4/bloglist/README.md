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

**Exercise 4.8-4.12**

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
22. blog ID transformation
    - convert _id to id
    - remove _id and _v
      handle using schema toJSON transform
23. blog creation increases DB size
    - POST /api/blogs
    - verify blog count increases by 1
24. default likes = 0
    - missing likes should become 0
    - implement via schema default
      `likes: { type: Number, default: 0 }`
25. validation for required fields 
    - missing title or url = 400 Bad Request
    - handle inside /controller/bloglists.js
26. refactor all .then() to async/await

**Exercise 4.13-4.14**

27. add HTTP routes for PUT and DELETE requests in controllers/bloglists.js
28. make sure to transform MongoDB metadata into a clean JSON format for API responses like _id to id (e.g. convert _id → id, remove __v)
29. deleting a single blog post
    - DELETE /api/blogs/:id
    - verify blog count decreases by 1
30. updating likes in a single blog post
    - PUT /api/blogs/:id
    - send request body ({ likes: 15 })
    - verify the database reflects the updated likes value

**Exercise 4.15-4.23**

31. `npm install bcrypt`
32. add schema model for user models/user.js
33. add HTTP routes for user controllers/users.js

34. refactor userSchema username to have a minLength of 3
35. create logging functions utils/logger.js
36. add custom middleware to log http request info and errors
37. refactor controllers/users.js to validate username and password length before saving
38. mount custom middleware in the app
39. create user_api.test.js
40. add usersInDb function to fetch users from the database
41. add errorHandler for username uniqueness
42. add tests for user creation + validation (length + required fields)
43. refactor BlogList and User schemas to support relationships
44. refactor controllers to connect blogs ↔ users (bidirectional linking)
45. `npm install jsonwebtoken`
46. create controllers/login.js
47. mount controllers/login in the app
48. create a function to extract the token from the authorization header in controllers/login.js
49. checks token validity with jwt.verify
    `jwt.verify(getTokenFrom(request), process.env.SECRET)`
    - checks if token was signed by your server
    - checks if it was tampered with
    - decodes it
50. test valid JWT token allows blog creation
51. test missing token and malformed token return unauthorized error
52. move getTokenFrom function to middleware
53. attach token to request object
54. mount middleware.getTokenFrom in app
55. request.token is now accessible in controllers
56. Refactor DELETE request in controllers/bloglists
    - verify JWT token before processing delete request
    - retrieve blog and user from the database
    - allow deletion only if the authenticated user is the creator of the blog
    - remove deleted blog reference from user's blogs array
    - return appropriate status codes for unauthorized, forbidden, and missing resources
57. Refactor authentication logic
    - create `userExtractor` middleware to handle authenticated user extraction.
    - move duplicated JWT verification and user lookup logic from controllers into middleware.
    - attach the authenticated user to `request.user`.
    - apply `userExtractor` only to protected routes (`POST` and `DELETE`).
    - ensure public routes such as `GET /api/blogs` continue to work without authentication.
58. Delete authorization    
    - refactor blog deletion to use `request.user`.
    - verify that only the owner of a blog can delete it.
    - return `403 Forbidden` when a user attempts to delete a blog they do not own.
59. Testing
    - update integration tests to include authentication tokens where required.
    - refactor test setup to create users and blogs with proper ownership relationships.
    - verify blog creation, deletion, and authorization behavior through automated tests.
    - ensure all tests pass for `blog_api.test.js` and `user_api.test.js`.
60. Test refactor and isolation fixes
    - identify that tests pass individually but fail when running the full test suite
    - discover race conditions caused by concurrent execution of test files in Node test runner
    - fix shared database state issues between test files
    - standardize `beforeEach` cleanup across all test suites:
      - clear `User` collection
      - clear `BlogList` collection
    - introduce consistent test data setup using shared helper functions
    - ensure each test starts with a predictable and isolated database state
61. Centralized test data setup
    - create `setupTestData` helper to initialize test environment
    - refactor test setup to create:
      - a test user
      - initial blogs linked to the user via `userID`
    - maintain consistency between `User.blogs` and `Blog.userID`
    - remove duplicated setup logic from individual test files
62. Blog-user relationship consistency in tests
    - ensure each blog is explicitly assigned a `userID`
    - update user document to include created blog IDs in `user.blogs`
    - fix missing relationship synchronization between user and blogs in test database
    - improve realism of test data to match production behavior
63. Authentication handling in tests
    - generate JWT tokens using `loginUser` helper
    - attach tokens to protected requests using `Authorization` header
    - ensure POST and DELETE blog routes are tested with valid authentication
    - verify unauthorized requests are rejected correctly
64. Node test runner behavior clarification
    - learn that `.only` requires `--test-only` flag when using `node --test`
    - run specific test files using `npm test -- <file>`
    - confirm full suite execution requires consistent setup across all test files
    - discover that test instability was caused by concurrent execution of test files
    - resolve cross-file test interference by enforcing sequential execution using `--test-concurrency=1`

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

test('new blog post created', () => {
  const newBlog = {
    title: 'Creating new blogs',
    author: "Jane Doe",
    url: "https://postit.com",
    likes: 8
  }
  return api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)    
    .then(() => {
      return helper.blogsInDb()
    })
    .then(blogsAtEnd => {
      console.log(`${blogsAtEnd.length} === ${helper.initialBlogs.length + 1}`)
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      console.log(titles)
      assert(titles.includes('Creating new blogs'))      
    })
})

test('blog without likes', () => {
  const newBlog = {
    title: 'Blogs without likes',
    author: "Jane Doe",
    url: "https://postit.com",
  }

  return api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      console.log(response.body) 
      assert.strictEqual(response.body.likes, 0)      
    })
})

test('missing title or url error 400', () => {
  const newBlog = {    
    author: "Jane Doe",
    url: "https://postit.com",
    likes: 10
  }

  return api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)    
})

after(() => {
    return mongoose.connection.close()
      .then(() => {
        console.log('connection closed')
      })
})
```

---

## **GOOD TO KNOW INFO**

### BCRYPT

`bcrypt` is a password hashing library. It turns password into a scrambled irreversible string.
  - `saltRounds` controls how computationally expensive the hashing is
     the higher the number the more secure but slower
     Common values:
     - 10 -> very common default
     - 12 -> stronger, slower
     - 14+ -> pretty heavy

    `What is salt?`
     It is random data added to the password before hashing.

    `What is hashing?`
     Hashing is a way of turning data into a fixed, scrambled fingerprint that cannot be turned back into the original data. - What you get is called a Hash.

    `Why is bcrypt expensive?`
     It means computationally costly. It takes time and CPU effort. bcrypt is intentionally slow. The slowness is the whole security trick. When you set saltRounds = 10, it basically means "Do a bunch of repeated hashing steps 2¹⁰ times (≈ 1024 rounds of work).”

### JWT JSON Web Token

What does an authorization contain?
```
Example: 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
It contains encoded data like: 
```
{
  "id": "64a1f9...",
  "username": "alice",
  "iat": 1710000000,
  "exp": 1710003600
}
```
- It is signed, not encrypted
- Anyone can decode it, but only your server can verify it

### TESTING

`--test-concurrency=1` tests will be executed sequentially

### MIDDLEWARE

It is basically the backstage crew of the Express app. It can do almost anything that prepares, checks or reshapes a request before it reaches the route handler.

Request flow:
```
request → middleware → middleware → route → response
```

`request.get()` is mainly a header reader. It finds data inside request.headers.

### LESSONS LEARNED
- Middleware registered with `app.use()` affects every matching request.
- Authentication middleware should only be applied to routes that require an authenticated user.
- Integration tests help reveal middleware placement issues and authorization edge cases.
