# Part 5: BlogList App  
*A FullStack Open Course Exercise*

This README contains an understanding of how the application works while completing Part 5.

## Exercise 5.1-5.4
I chose not to clone the starter repository because I wanted to implement the application from scratch to better understand the architecture and data flow, using the Notes app as a reference.

### Project Setup

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

### How React starts the app

5. index.html provides a single HTML container (#root).

6. React mounts the app into this container using ReactDOM.createRoot().

7. After mounting, React manages everything inside the root div.

8. App.jsx is the root component where the application structure starts and other components are connected.

### Backend communication

9. services/blogs.js uses Axios to communicate with the backend:
   - GET → fetch blogs
   - POST → create blog
   - PUT → update blog
   - DELETE → remove blog

10. services/login.js handles login:
   - Sends a POST request with credentials
   - Backend validates and responds (usually with token or user info)

### Authentication

11. Implemented login functionality.

12. When login is successful:

    - The authenticated user is stored in React state.
    - The authentication token is stored and passed to protected API requests.

13. Conditional rendering is used:

    - If no user is logged in, the login form is displayed.
    - If a user is logged in, the blog list and blog form are displayed.

### Blog Management

14. Blogs are fetched from the backend using useEffect() when the application loads.

15. New blogs can be created through a controlled form.

16. After a successful POST request:

    - The returned blog is added to React state.
    - The UI updates immediately without reloading the page.

17. Individual blogs are rendered using Array.map() and React keys.

### Updating Blogs

18. Implemented blog editing functionality.

19. Blog updates are sent to the backend using PUT requests.

20. Only the original creator of a blog is allowed to update it.

21. Backend authorization verifies:

    - The user is authenticated.
    - The blog exists.
    - The authenticated user matches the creator of the blog.

22. Unauthorized update attempts return:

    - 403 Forbidden

### Likes

23. Implemented a like feature.

24. Users can increase the number of likes for a blog.

25. Like updates are synchronized between the frontend and backend.

--- 

## Key learning idea

- React UI is separate from backend logic
- components/ handles UI
- services/ handles API requests
- App.jsx connects everything together
- Controlled forms using React state
- Object state updates with the spread operator
- Conditional rendering based on authentication state
- Authentication vs authorization
- Protecting backend routes with user ownership checks
- Updating React state after asynchronous API requests
- Separating API communication into service modules