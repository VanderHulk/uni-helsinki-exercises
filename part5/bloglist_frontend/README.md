# Part 5: BlogList App  
*A FullStack Open Course Exercise*

This README contains an understanding of how the application works while completing Part 5.

## Project Setup

1. The project is created using Vite:
   npm create vite@latest

2. Unnecessary starter files are removed to keep the structure clean.

3. Basic files include:
   - index.html
   - main.jsx
   - App.jsx

4. Folders are created:
   - components/ → UI components
   - services/ → backend API calls

## How React starts the app

5. index.html provides a single HTML container (#root).

6. React mounts the app into this container using ReactDOM.createRoot().

7. After mounting, React manages everything inside the root div.

8. App.jsx is the root component where the application structure starts and other components are connected.

## Backend communication

9. services/blogs.js uses Axios to communicate with the backend:
   - GET → fetch blogs
   - POST → create blog
   - PUT → update blog
   - DELETE → remove blog

10. services/login.js handles login:
   - Sends a POST request with credentials
   - Backend validates and responds (usually with token or user info)

## Key learning idea

- React UI is separate from backend logic
- components/ handles UI
- services/ handles API requests
- App.jsx connects everything together