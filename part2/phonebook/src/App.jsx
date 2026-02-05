import { useState } from 'react'

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

  const searchContacts = persons.filter(person => 
    person.name.toLowerCase().includes(keyword.toLowerCase().trim())
  )

  const DisplayFilteredContacts = ({ contacts }) => {
    return (
      contacts.map(contact => 
        <li key={ contact.id }>
          { contact.name } { contact.number }
        </li>
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <label>Search:<input 
            value = {keyword}
            onChange = {(e) => setKeyword(e.target.value)}
            />
          </label>
        </div>
      </form>
      <h3>Add a new contact</h3>
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
      <h3>Numbers</h3>
      <ul>        
        <DisplayFilteredContacts contacts={keyword ? searchContacts : persons} />
      </ul>
      <div>Debug: { newName } {newNumber}</div>
    </div>
  )
}

export default App