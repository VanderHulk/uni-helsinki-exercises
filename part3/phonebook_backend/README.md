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