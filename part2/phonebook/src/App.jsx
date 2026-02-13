import { useState, useEffect } from 'react'
import { InputField } from './components/InputField'
import { SearchField, SearchFilter } from './components/Search'
import { PersonForm } from './components/PersonForm'
import { getAll, create, update, deleteItem } from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    // console.log('effect')
    getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
  }, [])  

  const addContact = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (!trimmedName || !trimmedNumber) return
    
    const person = persons.find(person => person.name.toLowerCase() === trimmedName.toLowerCase())
    // checks if a contact with the same name already exists    
      
    if (!person) {

      const newContact = {
        // no id here — the server generates it when saving
        name: trimmedName,
        number: trimmedNumber
      }

      create(newContact)
        .then(returnedData => {
          console.log('addContact: axios post response', returnedData)
          setPersons(prev => prev.concat(returnedData))
          setNewName('')
          setNewNumber('')
        })
    } else {
      updateContact(person, trimmedNumber)
    }
  }

  const updateContact = (person, trimmedNumber) => {
    if(!person) return
    
    const personNumber = person.number.replace(/\D/g, "")

    if(personNumber === trimmedNumber.replace(/\D/g, "")) {        
      alert(`${person.name} ${person.number} is already added to phonebook`)
      return
    } else {
      const changedContact = { ...person, number: trimmedNumber }          
      if(confirm(`${person.name} is already added to phonebook, replace the ${person.number} with ${trimmedNumber}?`)) {
        update(person.id, changedContact)
          .then(returnedData => {                    
            setPersons(prev => 
              prev.map(p => p.id === person.id ? returnedData : p)
            )
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  // handleDelete is pass as reference to SearchFilter > Person (where it is called)
  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name}?`)) {
      deleteItem(id)
        .then(returnedStatus => {
          if(returnedStatus === 200 || returnedStatus === 204){
            alert(`${person.name} has been successfully deleted!`)
            setPersons(persons.filter(person => person.id !== id))
          }
        })
        .catch(error => {
          alert(`Failed to delete ${person.name}. Please try again.`)
        })
    }    
  }

  // use for filtering contacts when user searches a specific contact
  // returns persons state when user is not searching
  const filteredContacts = keyword 
    ? persons.filter(person => {
        console.log("searchContacts", keyword.toLowerCase().trim())
        return person.name.toLowerCase().includes(keyword.toLowerCase().trim())
      })
    : persons  

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
        <SearchFilter contacts={filteredContacts} onDelete={handleDelete}/>
      </ul>

      {/* <div>Debug: {newName} {newNumber}</div> */}
    </div>
  )
}

export default App