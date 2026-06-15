// route logic only (request handlers)

// Router is a smaller, modular version of the Express application, used to define route handlers for specific paths
const blogsRouter = require('express').Router()
const BlogList = require('../models/bloglist')
const middleware = require('../utils/middleware')

// .find({}) find all documents, returns a promise
// {} empty filter, no conditions so all documents are returned
blogsRouter.get('/', async (request, response) => {  
  const blogs = await BlogList
    .find({}).populate('userID', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new BlogList({
    title: body.title,
    author: body.author,
    url: body.url,
    userID: user._id,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id/like', middleware.userExtractor, async (request, response) => {
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

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const { title, author, url, likes } = request.body

  const user = request.user  

  const blog = await BlogList.findById(id)
  
  if(!blog) {
    return response.status(404).end()
  }
  
  if(blog.userID.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'not allowed to update this blog' })
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const user = request.user  

  const blog = await BlogList.findById(id)

  if(!blog) {
    return response.status(404).end()
  }

  if(blog.userID.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'not allowed to delete this blog' })
  }

  await BlogList.findByIdAndDelete(id)

  user.blogs = user.blogs.filter(blogs => blogs.toString() !== id)  
  await user.save()

  response.status(204).end()  
})

module.exports = blogsRouter