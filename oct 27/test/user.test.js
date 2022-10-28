const request = require('supertest')
const app = require('../app.js')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'priya',
        email: 'priya@example.com',
        password: 'priya777'
    }).expect(201)
})