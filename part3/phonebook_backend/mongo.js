const mongoose = require('mongoose')

if(process.argv.length < 5) {
    console.log('give password, name, and number as arguments')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const database = 'phonebook'

const url = `mongodb+srv://vanderhulk_db_user:${password}@cluster0.ei3uuwd.mongodb.net/${database}?appName=Cluster0`

// turns off strict filtering, allows query by fields that are not in the Mongoose schema
mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', phonebookSchema)

const contact = new Contact({
    name,
    number,
})

contact.save()
    .then(result => {
        console.log(result, '\nContact saved!')
        return Contact.find({})
    })
    .then(result => {
        result.forEach(contact => {
            console.log(contact)
        })
    })
    .finally(() => mongoose.connection.close())