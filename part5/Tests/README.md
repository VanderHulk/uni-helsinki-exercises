# Part 5: BlogList App e2e Testing
*A FullStack Open Course Exercise*

## Exercises 5.17-5.23

### 1. Create the E2E testing project

Copied the existing `bloglist_backend` into the Part 5 E2E testing project to use a separate test environment.

Installed the dependencies inside the copied backend:

```bash
npm install
```

Important: the command must be run inside the correct project directory.

---

### 2. Create a test environment

The backend uses:

```text
NODE_ENV=test
```

This tells the application that tests are being run.

The backend configuration uses this variable to select the test database instead of the normal development database.

`process.env` is provided by Node.js and gives the application access to environment variables.

`dotenv` loads variables from the .env file into process.env.

The basic flow is:

```text
.env
 ↓
dotenv
 ↓
process.env
 ↓
application
```

---

### 3. Create an npm script for the test backend

The backend has:

```json
"start:test": "cross-env NODE_ENV=test node --watch index.js"
```

This means:

* Start the backend in test mode.
* Use the test environment.
* Start `index.js`.
* Restart the application when files change.

---

### 4. Check that the backend works

```bash
npm run start:test
```

The backend successfully connected to the test MongoDB database.

Discovered that the server was actually listening on port 3003, even though the logger.info() message was not showing.

The backend configuration uses:

```js
const PORT = process.env.PORT || 3003
```

So the test backend runs on:

```text
http://127.0.0.1:3003
```

---

### 5. Check the frontend

The frontend is a Vite application.

Running:

```bash
npm run dev
```

showed that Vite runs on:

```text
http://localhost:5173
```

The frontend therefore uses port `5173`.

---

### 6. Create the Playwright test

The first E2E test checks that the Bloglist application's front page can be opened and that the title is visible.

The test originally opened:

```text
http://localhost:5173
```

---

### 7. Playwright could find the tests

Checked test discovery with:

```bash
npx playwright test --list
```

Playwright found the tests successfully.

This showed that test discovery was not the problem.

---

### 8. Investigate the webServer error

Playwright initially reported:

```text
Error: Process from config.webServer was not able to start.
Exit code: 1
```

The backend was checked manually and confirmed to be working.

curl was then used to check whether the frontend was actually reachable.

This failed:

```text
http://127.0.0.1:5173
```

when the frontend was not running.

After starting the frontend, `127.0.0.1` worked while `localhost` did not.

`localhost` normally points to the same computer as `127.0.0.1`, but the two addresses were not behaving the same way on the machine.

---

### 9. Configure Playwright to start both applications

The important discovery was that Playwright needs both applications:

```text
Playwright
    ↓
Frontend: 5173
    ↓
Backend: 3003
    ↓
Test database
```

The final Playwright configuration starts both servers:

```js
webServer: [
  {
    command: 'npm run start:test',
    cwd: '../../bloglist_backend',
    url: 'http://127.0.0.1:3003/api/blogs',
    reuseExistingServer: !process.env.CI,
  },
  {
    command: 'npm run dev -- --host 127.0.0.1',
    cwd: '../../bloglist_frontend',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
  },
]
```

Also configured:

```js
baseURL: 'http://127.0.0.1:5173'
```

This allows tests to use the frontend address as their starting point.

---

### 10. curl

What is curl?

curl is a command-line tool for checking or communicating with a web address. It provides a quick way to check whether a web server can be reached from the computer.

Used to ask:

"Can my computer reach the application running at this address?"

```bash
curl -i http://localhost:5173
```

The -i option tells curl to also show the HTTP response information, such as the status code and headers.

Compared:

`curl -i http://localhost:5173`

with:

`curl -i http://127.0.0.1:5173`

This helped identify that localhost was not working correctly, while 127.0.0.1 was.

---

### 11. Final result

The E2E setup now works. 🎉

Playwright:

1. Starts the test backend.
2. Starts the frontend.
3. Waits for both applications to be available.
4. Opens the frontend.
5. Runs the E2E test.
6. The frontend communicates with the test backend.
7. The backend uses the test MongoDB database.

### Main lesson

The biggest lesson from this setup was that an E2E test tests the whole application working together, not just one piece.

```text
Playwright
    ↓
Frontend
    ↓
Backend
    ↓
Database
```

When something goes wrong, each piece should be checked separately instead of assuming the test itself is broken.

### Completed the End to End Testing exercises using Playwright.

Topics covered:
- Playwright setup and configuration
- E2E testing with browser interactions
- Test database resetting
- Created a testing router for resetting the test database
- API requests with Playwright
- Login testing
- Creating, liking and deleting blogs
- Testing authorization
- Handling confirmation dialogs
- Using Playwright locators and assertions
- Created reusable helper functions for login and blog creation
- Running frontend and backend automatically during E2E tests

Status: Completed