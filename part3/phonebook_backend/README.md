# Exercise Information

FullStack Open - Part 3

Phonebook Backend: Exercises 3.1-3.6

---

## Steps:

Note: Persons is stored in-memory and resets when the server restarts.

**Exercise 3.1**
1. `npm init`
2. `npm install express`
3. create main file index.js
4. create .gitignore and add node_modules
5. import express
6. `GET /api/persons` - returns all persons
7. bind express app to a network port (start the server)
    ```javascript
    const PORT = 3001
    app.listen(PORT)
    ```
**Exercise 3.2**

8. `GET /api/info` - shows number of persons and timestamp

**Exercise 3.3**

9. `GET /api/persons/:id` - returns a single person

**Exercise 3.4**

10. `DELETE /api/persons/:id` - deletes a person
    - use filter(), to create a new array excluding the deleted entry

**Exercise 3.5**

11. create generateID function
    - generates a unique ID using Math.random
    - ensures no duplicate ID exists in the current array
12. `POST /api/persons` - adds a new person

**Exercise 3.6**

13. validate required fields and check for duplicate name
14. error handling

**Exercise 3.7**

15. `npm install morgan`
16. add morgan middleware
    ```javascript
    const morgan = require('morgan')
    app.use(morgan('tiny'))
    ```
**Exercise 3.8**

17. create custom morgan to show data sent in HTTP POST requests
    ```javascript
    const customMorgan = ':method :url :status :res[content-length] - :response-time ms :body'
    app.use(morgan(customMorgan))
    ```

**Exercise 3.9**

18. change baseUrl to relative path '/api/persons' (part2/phonebook/src/services/phonebook.js) 
    `const baseUrl = '/api/persons'`
    Using a relative path ensures the same code works in development (with proxy) and production (served by Express).
19. change PORT for deployment so Render can assign the port dynamically
    `const PORT = process.env.PORT || 3001`
20. create scripts in package.json to automatically create dist directory in frontend and copy it to the backend *instead of running **npm run build** in the frontend*
    ```JSON
    "build:ui": "rm -rf dist && cd ../../part2/phonebook && npm run build && cp -r dist ../../part3/phonebook_backend",    
    "build": "npm run build:ui && echo 'Frontend copied into backend for Render.'",
    ```
21. serve the frontend, use express.static() middleware
    `app.use(express.static('dist'))`
22. configure vite proxy for local development (part2/phonebook/vite.config.js) so that /api requests go to the backend without CORS issues
    ```javascript
    export default defineConfig({
          plugins: [react()],
          server: {
            proxy: {
              '/api':{
                target: 'http://localhost:3001',
                changeOrigin: true,
              },
            }
          },
        })
    ```
---

## HTTP Status Codes:
GET /api/persons/:id
- 200: OK if found
- 404: Not Found if missing

DELETE /api/persons/:id
- 204: No Content on success

POST /api/persons
- 201: Created on success
- 400: Bad Request if name or number missing
- 400: Bad Request if name not unique