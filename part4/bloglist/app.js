// express app configuration, database connection

const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/bloglists')

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

// this is were the route handlers get mounted
app.use('/api/blogs', blogsRouter)

module.exports = app