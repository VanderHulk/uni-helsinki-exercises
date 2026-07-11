const { test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const config = require('../utils/config')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async() => {
  await helper.setupTestData()
})

test('amount of blogs returned', async() => {
  const response = await api
    .get('/api/blogs')
    // expect is SuperTest's internal Promise chain, await api is waiting for the final result
    .expect(200)
    // .expect('Content-Type', /application\/json/) only verifies that the response is labeled as JSON — not that the JSON content is correct.
    .expect('Content-Type', /application\/json/)
    
    // response.body exists, JSON parsing already succeeded
    // console.log('response.body:', response.body)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id as the unique identifier', async() => {
  const response = await api
    .get('/api/blogs')
  
  response.body.forEach(blog => {
    assert.notStrictEqual(blog.id, undefined) 
    assert.strictEqual(blog._id, undefined)
  })  
})

test('new blog post created', async() => {
  const token = await helper.loginUser()  

  const newBlog = {
    title: 'Creating new blogs',
    author: "Jane Doe",
    url: "https://postit.com",
    likes: 8
  }

  const response = await api  
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    // console.log(`${blogsAtEnd.length} === ${helper.initialBlogs.length + 1}`)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
      // console.log(titles)
      assert(titles.includes('Creating new blogs'))
})


test('blog without likes', async() => {
  const token = await helper.loginUser()

  const newBlog = {
    title: 'Blogs without likes',
    author: "Jane Doe",
    url: "https://postit.com",
  }

  const response = await api 
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    // console.log('response.body', response.body) 
    assert.strictEqual(response.body.savedBlog.likes, 0)
})

test('missing title or url error 400', async() => {
  const token = await helper.loginUser()

  const newBlog = {    
    author: "Jane Doe",
    url: "https://postit.com",
    likes: 10
  }
  
  const response = await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)    
})

test('updating likes in a single blog post', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]  

  // console.log('blogsAtStart', blogsAtStart)

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 15 })
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    // console.log('blogsAtEnd', blogsAtEnd[0])
  
    assert.strictEqual(blogsAtEnd[0].likes, 15)  
})

test('deleting a single blog post', async() => {
  const token = await helper.loginUser()

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  const blogUserID = blogToDelete.userID.toString()



  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const userAtEnd = await User.findById(blogUserID)  

  const ids = blogsAtEnd.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
 
  const userBlogIds = userAtEnd.blogs.map(id => id.toString())  
  assert(!userBlogIds.includes(blogUserID))
})

after(async() => {
    await mongoose.connection.close()
    console.log('blog connection closed')
})