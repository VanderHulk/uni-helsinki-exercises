# Exercise Information

FullStack Open - Part 3:

- Node.js and Express: Exercises 3.1-3.8
- Deploying app to internet: Exercises 3.9-3.11

    ## ONLINE APPLICATION : https://fullstackopen-pjbo.onrender.com

- Saving data to MongoDB: Exercises 3.12-3.18

- Validation and ESLint: Exercises 3.19-3.22

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

**Exercise 3.9-3.11**

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
    **RENDER DEPLOYMENT:** 
    1. Sign-up/Log-in at Render.com
    2. connect github repository (public on free plan) to Render, 
    3. configure new Web Service according to GitHub setup and app's package.json script setup
        - Root directory: point to your backend repo.
        - Build command: npm run build (or a no-op if dist/ already exists).
        - Start command: npm run start.
    4. Ensure dist/ is included in the backend repo (so Express can serve the frontend).
    5. Deploy the service

**Exercise 3.12**

23. `npm install mongoose`
24. setup and define process.argv variables
25. define url to connect to mongoDB Atlas
26. turn-off strict filtering (allows queries that don’t match the schema strictly)
    `mongoose.set('strictQuery', false)`
27. setup connection (family: 4 forces IPv4, avoids some network issues)
    `mongoose.connect(url, { family: 4 })`
28. define schema, defines the shape of the documents in MongoDB.
```javascript
const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})
```
29. connect schema to MongoDB collection to interact with the database
```javascript
const Contact = mongoose.model('Contact', phonebookSchema)
```
30. define contact object
31. save new contact and display all contacts after
32. close database connection

**Exercise 3.13**

33. create a module (/models/phonebook.js) for database connection
34. import `const Contact = require('./models/phonebook')` to index.js
35. `npm install dotenv` and import `require('dotenv').config()` to index.js
36. create .env file to store sensitive data and add the file to .gitignore

**Exercise 3.14**

37. refactor index.js so that the data is fetched from the database
38. remove generateID, it will be auto generated
39. refactor POST request to save new data to the database
40. refactor PUT request to update existing database

**Exercise 3.15**

41. refactor DELETE request to delete entry from the database

**Exercise 3.16**

42. add errorhandler to catch invalid MongoDB ID -> CastError (unexpected or system-level error)

**Exercise 3.17**

43. update PUT request, remove findByIdAndUpdate and change to save() (returns a promise)
    
```javascript
contact.number = number

return contact.save().then((updatedContact) => {
    response.json(updatedContact)
})
```

**Exercise 3.18**

44. test HTTP GET api/persons/:id request with browser and Postman, worked!

**Exercise 3.19**

45. refactor frontend to display error message addContact() and Notification.jsx
46. define validation rules for each field in phonebookSchema
47. add ValidationError to errorHandler

**Exercise 3.20**

48. create own custom validator for number
```javascript
validate: {
    validator: function(v) {                                
        return /^\d{2,3}-\d{6,}$/.test(v)
    },
    message: props => `${props.value} is not a valid phone number! Format: [2-3 digits]-[6-8 digits]`
},
```

**Exercise 3.21**

49. build new dist and run tests
50. pushed to github and render

**Exercise 3.22**

51. Install ESLint as a development dependency
`npm install eslint @eslint/js --save-dev`
52. Add script in package.json
    "lint": "eslint ."
53. Initialize a default ESlint configuration
`npx eslint --init`
    eslint.config.mjs file is created
54. Install @stylistic/eslint-plugin
`npm install @stylistic/eslint-plugin --save-dev`
55. Configure eslint.config.mjs
56. Fix errors

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