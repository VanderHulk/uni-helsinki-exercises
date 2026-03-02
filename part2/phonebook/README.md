# Exercise Information  

FullStack Open - Part 2  

Phonebook: Exercises 2.6–2.15  

---

# App (root component)

## State

- **[persons, setPersons]**  
  Holds the phonebook list fetched from the server and updates when contacts are created, updated, or deleted.

- **[newName, setNewName]**  
  Holds and updates the new contact’s name input. Resets after successful submission.

- **[newNumber, setNewNumber]**  
  Holds and updates the new contact’s number input. Resets after successful submission.

- **[keyword, setKeyword]**  
  Holds and updates the user’s search input for filtering contacts.

- **[notification, setNotification]**  
  Holds and updates success and error messages.

---

## Effect

- Fetches phonebook contacts from the server once on mount (`[]`) using `getAll`.

---

## Derived Value (Not State)

- **filteredContacts**  
  Filters the `persons` state based on the `keyword` input (case-insensitive search).

---

## Main Functions

### addContact
- Prevents default form submission.
- Trims input values.
- Checks for duplicate names (case-insensitive).
- Sends POST request via `create` if new.
- Calls `updateContact` if duplicate exists.

### updateContact
- Compares numbers after removing non-digit characters using `/\D/g`.
- Prevents unnecessary updates if numbers are identical.
- Asks for confirmation before updating.
- Sends PUT request via `update`.
- Handles server-side deletion errors (404).

### handleDelete
- Asks for confirmation before deletion.
- Sends DELETE request via `deleteItem`.
- Updates state after successful deletion.
- Handles 404 errors if contact was already removed from the server.

### messageTimer
- Sets notification state with `{ message, type }`.
- Automatically clears notification after a given duration.

---

# Modules

## Components

### InputField.jsx
- Reusable controlled input component.
- Receives `text`, `stateValue`, and `setStateValue` props.
- Used in both search and form inputs.

### Notification.jsx
- Receives `notification` state.
- Returns `null` if no notification.
- Dynamically applies CSS class based on notification type (`success` or `error`).

### PersonForm.jsx
- Renders form for adding contacts.
- Uses `InputField` for name and number.
- Receives `values`, `setters`, and `onSubmit` props.

### Search.jsx

#### SearchField
- Uses `InputField` for filtering contacts.
- Receives `keyword` state and setter.

#### SearchFilter
- Receives filtered contacts.
- Maps contacts into `Person` components.

#### Person (internal component)
- Renders individual contact.
- Handles delete button click.

---

# Services

Uses **:contentReference[oaicite:0]{index=0}** to make HTTP requests.  
All API calls are asynchronous and return promises.

### phonebook.js

- **getAll**
  - GET all contacts from `http://localhost:3001/persons`

- **create**
  - POST new contact to server

- **update**
  - PUT updated contact data by id

- **deleteItem**
  - DELETE contact by id
  - Returns response status

---

# Reflection

1. Avoid duplicating state.  
   `filteredContacts` is derived from `persons` and `keyword`, so it should not be stored separately.

2. Normalize data before comparing.  
   Phone numbers are compared after removing non-digit characters using `/\D/g`.

3. Handle asynchronous errors properly.  
   Always catch rejected promises from PUT and DELETE requests to prevent UI crashes.

4. Separate concerns properly.  
   - UI logic in components  
   - Server communication in service module  
   - Notification logic centralized in one function  

5. Controlled components ensure predictable data flow.  
   All input fields are controlled via React state.