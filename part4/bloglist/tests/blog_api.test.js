const { test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const config = require('../utils/config')
const helper = require('./test_helper')
const BlogList = require('../models/bloglist')

const api = supertest(app)

beforeEach(() => {
    return BlogList.deleteMany({})
      .then(() => {
        console.log('BlogList cleared')
        const blogObjects = helper.initialBlog
          .map(blog => new BlogList(blog))

        const promiseArray = blogObjects.map(blog => blog.save())
        return Promise.all(promiseArray)
      })
})

test('amount of blogs returned', () => {
    return api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        const blogArray = response.body
        console.log('response.body:', blogArray)
        assert.strictEqual(blogArray.length, helper.initialBlog.length)
      })
})

after(() => {
    return mongoose.connection.close()
      .then(() => {
        console.log('connection closed')
      })
})