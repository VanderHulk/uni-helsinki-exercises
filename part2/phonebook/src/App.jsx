import { useState } from 'react'
import { InputField } from './components/InputField'
import { SearchField, SearchFilter } from './components/Search'
import { PersonForm } from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    { name: 'Arto Miinin', number: '040-123456334', id: 5 },
    { name: 'Mary Poppins', number: '39-44-7893555', id: 6 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      return
    }    
  
    const newContact = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    }
    
    const person = persons.find(person => person.name === newName)
    
    if (!person) {          
      setPersons(persons.concat(newContact))
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