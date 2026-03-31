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

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
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

app.get('/api/persons/:id', (request, response, next) => {     

    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))        
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Contact.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
            console.log(`${id} has been deleted`)
        })
        .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const { number } = request.body

    console.log('new number', number)

    Contact.findById(id)
        .then(contact => {
            if (!contact) {
                return response.status(404).json({ error: 'Contact not found' })
            }

            contact.number = number

            return contact.save().then((updatedContact) => {
                response.json(updatedContact)
            })
        })        
        .catch(error => next(error))
})

// Catch-all for unknown routes must come LAST
app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})