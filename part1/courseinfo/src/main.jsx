import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

//  ReactDOM.createRoot, creates a React root, which is the entry point for a React application
//  document.getElementById('root'), finds the html element in index.html that has id of root where React can attach itself, also tells React to take control of this DOM element
//  .render(<App />) , tells react to render the App component inside that root
//  from App, React will then render all the child components