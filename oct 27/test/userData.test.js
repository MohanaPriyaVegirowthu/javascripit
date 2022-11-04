const request = require('supertest')
const app = require('../app.js')
const User = require('../models/users')

const userOne = {
    name: 'Mohana',
    email: 'mohana@example.com',
    password: 'mohana@34'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'priya',
        email: 'priya@example.com',
        password: 'priya777'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisnotmypass'
    }).expect(400)
})