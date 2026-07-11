const app = require('../app')
const BlogList = require('../models/bloglist')
const User = require('../models/user')

const supertest = require('supertest')
const bcrypt = require('bcrypt')

const api = supertest(app)

const initialBlogs = [
  {    
    title: "Example Blog Post",
    author: "John Doe",
    url: "https://example.com",
    likes: 5
  },  
  {    
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {    
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…",
    likes: 5
  },
]

const createTestUser = async() => {
  const passwordHash = await bcrypt.hash('secret', 10)

  const user = new User({
    username: 'root',
    name: "Superuser",
    passwordHash
  })

  return await user.save()
}

const createInitialBlogs = async(user) => {
  const blogsWithUser = initialBlogs.map(blog => ({
    ...blog,
    userID: user._id
  }))

  const savedBlogs = await BlogList.insertMany(blogsWithUser)

  user.blogs = user.blogs.concat(savedBlogs.map(blog => blog._id))
  await user.save()

  return savedBlogs
}

const setupTestData = async () => {
  await User.deleteMany({})
    console.log('beforeEach: User cleared')
  await BlogList.deleteMany({})
    console.log('beforeEach: BlogList cleared')

  const user = await createTestUser()
  await createInitialBlogs(user)

  return user
}

const loginUser = async() => {
  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'secret',
    })
  
  return `Bearer ${response.body.token}`
}

const blogsInDb = async() => {
  const blogs = await BlogList.find({})
  return blogs.map(blog => blog.toJSON())       
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  createTestUser,
  createInitialBlogs,
  setupTestData,
  loginUser,
  blogsInDb,
  usersInDb,
}