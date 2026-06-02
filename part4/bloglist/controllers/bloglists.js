// route logic only (request handlers)

// Router is a smaller, modular version of the Express application, used to define route handlers for specific paths
const blogsRouter = require('express').Router()
const BlogList = require('../models/bloglist')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// extracts token from the Authorization Header
const getTokenFrom = request => {
  // gets the Bearer
  const authorization = request.get('authorization')
  
  // checks the format and removes Bearer so you only get the token
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// .find({}) find all documents, returns a promise
// {} empty filter, no conditions so all documents are returned
blogsRouter.get('/', async (request, response) => {  
  const blogs = await BlogList
    .find({}).populate('userID', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  // check if there is user id otherwise it is invalid
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
 
  // replace -> const user = await User.findById(body.userID) with
  const user = await User.findById(decodedToken.id)
  
  // if userID cannot be found
  if(!user) {
    return response.status(400).json({ error: 'userID missing or not valid' })
  }

  const blog = new BlogList({
    title: body.title,
    author: body.author,
    url: body.url,
    userID: user._id,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  const savedUser = await user.save()

  response.status(201).json({
    savedBlog,
    savedUser
  })  
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