# Exercise Information  

FullStack Open - Part 2  

Countries: Exercises 2.18–2.20  

---

# App (root component)

## State

- **[countries, setCountries]**  
  Holds and updates (once) countries data from the server.

- **[searchWord, setSearchWord]**  
  Holds and updates user's country search.

- **[countryInfo, setCountryInfo]**  
  Holds and updates a single country's data.

- **[weather, setWeather]**  
  Holds and updates `countryInfo`'s weather data.

- **[error, setError]**  
  Holds and updates error messages.

---

## Effects

- Fetches countries data from the server once, on mount (`[]`).
- Fetches a country's weather data every time `countryInfo` gets updated (`[countryInfo]`).
- Updates `countryInfo` every time there is a new search result (`[searchResults]`).

---

## Components Used in App

- **ListCountries component**  
  Lists countries based on `searchResults`.

- **handleShow function**  
  Shows a specific country's data when a user clicks the **Show** button.  
  Used for `onClick` event.

---

# Modules

## Country.jsx

### CountryInfo
- Receives the `countryInfo` state value.
- Renders a single country's data.

### ListLanguages
- Receives the `countryInfo` languages data.
- Renders it along with the `CountryInfo` component.

### TenCountries
- Receives the `searchResults` variable.
- Renders a list of ten countries only.
- Handles the `onClick` to show a single country's data.

---

## Weather.jsx

### Weather
- Receives the `weather` state value and its data.

---

# Services

Use axios to make HTTP requests from the browser.  
API calls are asynchronous and handled using axios promises.

## countries.js

- **getAll**  
  GET list of countries from the server.

## weather.js

- **getWeather**  
  GET a country's weather data based on its latitude and longitude values.

---

# Reflection

## What are the mistakes I have made during this exercise?

### 1. Setting state during render
- React rendering must be **pure**, **free of side effects**, and **just return JSX**.  
- Setting state during render can cause an infinite render loop — because every time a state gets updated, a re-render will happen.

### 2. Manually synchronize state – Let React derive things reactively
- Results in error-prone code like stale data or infinite loops.
- Instead of manually updating `countryInfo` whenever input changes, let React calculate it automatically whenever the relevant state changes.

### 3. Confusion between render logic and effect logic
- **Render** → describes UI  
- **Effect** → handles external stuff  

### 4. Forgot to catch error states
- Missing error handling for API calls can cause crashes or uncaught promises.
- Always handle rejected promises or empty data states.
- Avoid `alert()` in real apps — `alert()` blocks rendering and gives poor UX.