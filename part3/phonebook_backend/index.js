require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/phonebook')

const app = express()

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

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
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })    
})

app.get('/api/info',  (request, response) => {
    const requestTime = new Date()
    Contact.find({}).then(contacts => {
        response.send(`
            <h2>Phonebook has info for ${contacts.length} people.</h2>
            <h3>${requestTime}</h3>
        `)
    })    
})

app.get('/api/persons/:id', (request, response) => {     

    Contact.findById(request.params.id)
        .then(contact => {
            response.json(contact)
        })
        .catch(error => {
            response.status(404).end()
        })        
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    Contact.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
            console.log(`${id} has been deleted`)
        })
        .catch(error => {
            response.status(404).end()
        })
})

// REMOVED id will be auto generated
// const generateID = () => {
//     let randomId
//     do {
//         randomId = Math.ceil(Math.random() * 10000).toString()
//     } while(persons.some(p => p.id === randomId))

//     return randomId
// }

// const validateName = (name, list) => {    
//     const trimmedName = name.toLowerCase().trim()    
//     return list.find(p => p.name.toLowerCase() === trimmedName)
// }

app.post('/api/persons', (request, response) => {    
    
    const { name, number } = request.body
    
    if(!name) return response.status(400).json({ error: 'name missing' })
    if(!number) return response.status(400).json({ error: 'number missing' })
    
    // findOne() searches for existing contact by name
    Contact.findOne({ name })
        .then(existingPerson => {
            if(existingPerson) {
                return response.status(400).json({error: 'name must be unique'})
            }

            const person = new Contact({
                name: name,
                number: number,
                // id: generateID()
            })
            return person.save()            
        })
        .then(savedContact => {
            response.json(savedContact)
        })
        .catch(error => {
            console.error(error)
            response.status(500).json({ error: 'something went wrong' })
        })
})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const { number } = request.body

    console.log('new number', number)

    Contact.findById(id)
        .then(note => {
            const changedContact = { number: number }
            return Contact.findByIdAndUpdate(id, changedContact, { returnDocument: 'after' })
        })
        .then(result => {
            if(!result) {
                return response.status(404).json({ error: 'Contact not found' })
            }
            response.json(result)
        })
        .catch(error => {
            response.status(500).json({ error: 'something went wrong' })
        })
})

// Catch-all for unknown routes must come LAST
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})