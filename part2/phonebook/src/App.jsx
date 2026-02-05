import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: '1',
      name: 'Arto Hellas',
      number: '045-300400340'      
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
  
    const contact = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    } 
    
    if (!person) {          
      setPersons(persons.concat(contact))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }    
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          <label>name:<input
              value = { newName }
              onChange = {(e) => setNewName(e.target.value)}
            />
          </label>              
        </div>
        <div>
          <label>number:<input
              value = { newNumber }
              onChange = {(e) => setNewNumber(e.target.value)}
            />      
          </label>            
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
            <li key={ person.id }>
              { person.name } { person.number }
            </li>
        )}
      </ul>
      <div>Debug: { newName } {newNumber}</div>
    </div>
  )
}

export default App