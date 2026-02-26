# Exercises Information

FullStack Open - Part 2

Countries: Exercises 2.18-2.20

# App (root component)

- **Four States:**
    - [countries, setCountries], holds and updates(once) countries data from the server
    - [searchWord, setSearchWord], holds and updates user's country search
    - [countryInfo, setCountryInfo], holds and updates a single country's data
    - [weather, setWeather], holds and updates countryInfo's weather data
- **Three Effects:**
    - fetches countries data from the server once, on mount ([])
    - fetches a country's weather data everytime countryInfo gets updated ([countryInfo])
    - updates countryInfo everytime there is a new search result ([searchResults])
- **ListCountries component**, lists countries based on searchResults
- **handleShow function**, for showing a specific country's data when a user clicks the 'Show' button. It is for onClick event.

---

# Modules

- **Country.jsx**
    - **Three components:**
        - **CountryInfo**, receives the countryInfo state value and renders a single country's data
        - **ListLanguages**, receives the countryInfo languages data and renders it along with CountryInfo component
        - **TenCountries**, receives the searchResults variable and renders a list of ten countries only, handles the onClick to show a single countryäs data
- **Weather.jsx**
    - **Weather component**, receives the weather state value and it's data

# Services
Use axios to make HTTP requests from the browser. API calls are asynchronous and handled using axios promises.

- **countries.js**
    - **getAll**, GET list of countries from the server
- **weather.js**
    - **getWeather**, GET a country's weather data based on its latitude and longitude values

---

# Reflection

What are the mistakes I have made during this exercise?
1. Setting state during render
    - React rendering must be **pure**, **free of side effects**, **just return JSX**. Setting state during render can cause an infinite render loop - because everytime a state gets updated, a re-render will happen. 
2. Manually synchronize state - Let React derive things reactively
    - Results in error-prone codes like stale data or infinite loops
    - Instead of manually updating a countryInfo whenever input changes, let React calculate it automatically whenever the relevant state changes
3. Confusion between render logic and effect logic
    - Render -> describes UI
    - Effect -> handles external stuff
4. Forgot to catch error states 
    - Missing error handling for API calls can cause crashes or uncaught promises
    - Always handle rejected promises or empty data states
    - avoid alert() in real apps, alert() blocks rendering and gives poor UX