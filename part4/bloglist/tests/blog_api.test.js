const { test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const config = require('../utils/config')
const helper = require('./test_helper')
const BlogList = require('../models/bloglist')

const api = supertest(app)

beforeEach(async () => {
    await BlogList.deleteMany({})      
      console.log('BlogList cleared')      

      /* const blogObjects = helper.initialBlog
        .map(blog => new BlogList(blog))
      // .save() is async, it returns multiple promises, so it gives an array of pending save operations so you have to wait for all the operations to finish
      // with await, there is a pause until all blogs have been saved in MongoDB
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray) */

      // Mongoose async operation that inserts many documents at once
      await BlogList.insertMany(helper.initialBlog)
})

test('amount of blogs returned', async() => {
    const response = await api
      .get('/api/blogs')
      // expect is SuperTest's internal Promise chain, await api is waiting for the final result
      .expect(200)
      // .expect('Content-Type', /application\/json/) only verifies that the response is labeled as JSON — not that the JSON content is correct.
      .expect('Content-Type', /application\/json/)
      
      // response.body exists, JSON parsing already succeeded
      console.log('response.body:', response.body)
      assert.strictEqual(response.body.length, helper.initialBlog.length)      
})

after(async () => {
    await mongoose.connection.close()      
    console.log('connection closed')      
})