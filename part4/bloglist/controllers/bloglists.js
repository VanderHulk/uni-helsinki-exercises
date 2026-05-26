// route logic only (request handlers)

// Router is a smaller, modular version of the Express application, used to define route handlers for specific paths
const blogsRouter = require('express').Router()
const BlogList = require('../models/bloglist')

// .find({}) find all documents, returns a promise
// {} empty filter, no conditions so all documents are returned
blogsRouter.get('/', async (request, response) => {  
  const blogs = await BlogList.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new BlogList(request.body)

  // console.log('blogsRouter.post', request.body)
    
  if(!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog) 
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const { likes } = request.body

  const blog = await BlogList.findById(id)
  if(!blog) {
      return response.status(404).end()
  }

  blog.likes = likes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const deletedBlog = await BlogList.findByIdAndDelete(id)

  if(!deletedBlog) {
    return response.status(404).end()
  }
    
  response.status(204).end()
})

module.exports = blogsRouter