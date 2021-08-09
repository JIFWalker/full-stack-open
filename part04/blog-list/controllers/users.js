const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('/', async (request, response) => {
    const users= await User.find({})
    response.json(users)
})

usersRouter.post('/',  async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        return response.status(400).send({
            error: 'Password is too short'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter