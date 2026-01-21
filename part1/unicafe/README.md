# Exercise Information

FullStack Open - Part 1

A more complex state, debugging React apps: Exercises 1.6-1.11

## App (root component)

- 3 states:
  - **[good, setGood]** holds and updates the number of good feedbacks  
  - **[neutral, setNeutral]** holds and updates the number of neutral feedbacks  
  - **[bad, setBad]** holds and updates the number of bad feedbacks

- **collectFeedback function**
  - receives a state value and a state updater as arguments  
  - increments the collected number of feedbacks  
  - updates the corresponding state value

- returns JSX components, which are rendered in the browser

---

## Other components

### Header
- accepts a **title** prop  
- returns JSX to display the title

### Button
- accepts **onClick, text** props  
- returns JSX to render a button that handles user interaction

### Statistics
- accepts **valGood, valNeutral, and valBad** as props  
- computes total, average, and positive feedback percentages  
- returns JSX displaying statistics in a table format

### StatisticsLine
- accepts **text and value** props  
- use inside Statistics component to render a single row in the statitics table

---

## How does the App collect data?

- uses React’s **useState** hook for state management  
- every time a user clicks a feedback button (good, neutral, bad), the corresponding state is updated through the **collectFeedback** function  
- additional statistical data (total, average, positive percentage) are computed inside the Statistics component using the three state values as props
