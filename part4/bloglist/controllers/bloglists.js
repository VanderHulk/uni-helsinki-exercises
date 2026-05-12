// route logic only (request handlers)

// Router is a smaller, modular version of the Express application, used to define route handlers for specific paths
const blogsRouter = require('express').Router()
const BlogList = require('../models/bloglist')

// .find({}) find all documents, returns a promise
// {} empty filter, no conditions so all documents are returned
blogsRouter.get('/', (req, res) => {
    BlogList.find({}).then(blogs => {
        res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {
    const blog = new BlogList(req.body)

    // console.log('blogsRouter.post', req.body)
    
    if(!req.body.title || !req.body.url) {
        return res.status(400).end()
    }
    
    blog.save().then(result => {
        res.status(201).json(result)
    })
})

module.exports = blogsRouter