const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await helper.setupTestData()
})

test('user creation succeeds', async() => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'captainAmerica',
    name: 'Steve Rogers',
    password: 'HailHydra!',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    console.log('user creation succeed', result.body)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    console.log('usernames', usernames)
    assert(usernames.includes(newUser.username))
})

test('user creation fails, username or password is too short', async() => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'to',
    name: 'Bingo',
    password: 'pass',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    console.log('username or password is too short', result.body)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username and password must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('user creation fails with proper statuscode and message if username is already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'secret',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  console.log('username is already taken', result.body)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
  console.log('user connection closed')
})