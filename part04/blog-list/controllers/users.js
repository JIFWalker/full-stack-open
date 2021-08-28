const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/',  async (request, response) => {
    const { password, name, username } = request.body

    if (!password || password.length < 3) {
        return response.status(400).send({
            error: 'Password is too short'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter