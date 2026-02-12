import { useState, useEffect } from 'react'
import axios from 'axios'
import { InputField } from './components/InputField'
import { SearchField, SearchFilter } from './components/Search'
import { PersonForm } from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  // use async/await to wait for the server to create the new contact (which does not exist yet in the backend)
  // after the response, update state with the saved contact (including generated id).
  const addContact = async (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      return
    }    
  
    const newContact = {
      // no id here — the server generates it when saving
      name: newName,
      number: newNumber
    }
    
    const person = persons.find(person => person.name === newName)
    // checks if a contact with the same name already exists
    
    if (!person) {          
      const response = await axios.post('http://localhost:3001/persons', newContact)
      console.log('axios post response', response)
      setPersons(persons.concat(response.data))
      // update state with the new contact, triggers re-render
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const searchContacts = persons.filter(person =>
    person.name.toLowerCase().includes(keyword.toLowerCase().trim())
  )

  const formValues = { newName, newNumber, keyword }
  const formSetters = { setNewName, setNewNumber, setKeyword }

  return (
    <div>
      <h2>Phonebook</h2>

      <SearchField values={formValues} setters={formSetters} />

      <h3>Add a new contact</h3>
      <PersonForm values={formValues} setters={formSetters} onSubmit={addContact} />

      <h3>Numbers</h3>
      <ul>        
        <SearchFilter contacts={keyword ? searchContacts : persons} />
      </ul>

      {/* <div>Debug: {newName} {newNumber}</div> */}
    </div>
  )
}

export default App