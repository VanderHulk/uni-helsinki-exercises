const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const BlogList = require('./models/bloglist')

const app = express()

// family: 4 - forces the connection to use IPv4 addresses only
mongoose
  .connect(config.MONGODB_URI, {family: 4})
  .then(() => {
    console.log('connected to MongoDB', config.MONGODB_URI)
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

// middleware that automatically parses incoming JSON request bodies
// parses, reading data and turning it into a format the program can work with
app.use(express.json())


// .find({}) find all documents, returns a promise
// {} empty filter, no conditions so all documents are returned
app.get('/api/blogs', (req, res) => {
    BlogList.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
    const blog = new BlogList(req.body)

    blog.save().then(result => {
        res.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})