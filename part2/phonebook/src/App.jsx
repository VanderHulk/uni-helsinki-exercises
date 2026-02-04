import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: '1',
      name: 'Arto Hellas'      
    }
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
  
    const contact = {
      id: String(persons.length + 1),
      name: newName  
    } 
    
    if (!person) {          
      setPersons(persons.concat(contact))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }    
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
            value = { newName }
            onChange = {(e) => setNewName(e.target.value)}
          />          
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
            <li key={ person.id }>
              { person.name }
            </li>
        )}
      </ul>
      <div>Debug: {newName}</div>
    </div>
  )
}

export default App