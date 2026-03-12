const express = require('express')
const app = express()

const morgan = require('morgan')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('body', (req) => JSON.stringify(req.body))

const customMorgan = ':method :url :status :res[content-length] - :response-time ms :body'

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('dist'))

// express.json() parses the body
app.use(express.json())

// :method :url :status :res[content-length] - :response-time ms
// app.use(morgan('tiny'))
app.use(morgan(customMorgan))

app.get('/api/persons', (request, response) => {    
    response.json(persons)
})

app.get('/api/info',  (request, response) => {
    const requestTime = new Date()
    response.send(`
        <h2>Phonebook has info for ${persons.length} people.</h2>
        <h3>${requestTime}</h3>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateID = () => {
    let randomId
    do {
        randomId = Math.ceil(Math.random() * 10000).toString()
    } while(persons.some(p => p.id === randomId))

    return randomId
}

const validateName = (name, list) => {
    const trimmedName = name.toLowerCase().trim()    
    return list.find(p => p.name.toLowerCase() === trimmedName)
}

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body
    const existingPerson = validateName(name, persons)
    // console.log(validateName(name))

    if(!name) return response.status(400).json({error: 'name missing'})
    if(!number) return response.status(400).json({error: 'number missing'})
    
    if(existingPerson) return response.status(400).json({error: 'name must be unique'})

    const person = {
        name,
        number,
        id: generateID()
    }
    
    persons = persons.concat(person)  
    response.status(201).json(person)
})

// Catch-all for unknown routes must come LAST
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)