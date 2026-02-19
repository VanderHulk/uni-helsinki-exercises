import { useState, useEffect } from 'react'
import { InputField } from './components/InputField'
import { SearchField, SearchFilter } from './components/Search'
import { PersonForm } from './components/PersonForm'
import { Notification } from './components/Notification'
import { getAll, create, update, deleteItem } from './services/phonebook'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('') 
  const [notification, setNotification] = useState(null)

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
          messageTimer(`Added ${returnedData.name}`, 'success', 3000)
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
            messageTimer(`Updated ${person.name}'s number from ${person.number} to ${trimmedNumber}`, 'success', 5000)
          })
          .catch(error => {
            messageTimer(`Information of ${person.name} has already been removed from server.`, 'error', 5000)          
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
            setPersons(prev => 
              prev.filter(p => p.id !== id)
            )
            messageTimer(`Deleted ${person.name}`, 'success', 3000)
          }
        })
        .catch(error => {
          if(error.response && error.response.status === 404) {
            messageTimer(
              `Information of ${person.name} has already been removed from server.`, 
              'error', 
              5000
            )
            
            setPersons(prev => 
              prev.filter(p => p.id !== id)
            )
          } else {
            messageTimer(
              `Failed to delete ${person.name}. Please try again.`,
              'error',
              5000
            )
          }
        })
    }    
  }

  const messageTimer = (message, type, duration) => {
    
    setNotification({ 
      message: message, 
      type: type
    })
    console.log(notification)
    setTimeout(() => {
      setNotification(null)
    }, duration)
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

      <Notification notification={notification}/>

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