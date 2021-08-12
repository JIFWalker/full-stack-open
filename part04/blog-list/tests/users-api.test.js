const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'WiseWolf', name: 'Holo', passwordHash, 
    _id: '611434d04995b298a47da3fc', blogs: ['5a422a851b54a676234d17f7', '5a422b3a1b54a666634d17f9'] })
    const user2 = new User({ username: 'HelpfulFox', name: 'Senko', passwordHash, 
    _id: '6115929244749cb242399fb0', blogs: ['5a422b3a1b54a676234d17f9', '5a422b891b54a676234d17fa', '5a422ba71b54a676234d17fb']})

    await user.save()
    await user2.save()
})


describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('when the user creation fails validation', () => {
    test('username must be at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'f',
            name: 'Respects',
            password: 'bloop',
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        expect(result.body.error).toContain('username: is too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username must be unique', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'WiseWolf',
            name: 'Holo',
            password: 'Kraft',
        }
        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password must be at least 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'Holo',
            name: 'Holo',
            password: 'f',
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password is too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})






