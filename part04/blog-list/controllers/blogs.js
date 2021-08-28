const jwt = require('jsonwebtoken')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })

    if (blogs) {
        response.json(blogs)
    } else {
        response.status(400).end()
    }
})

router.post('/', async (request, response) => {
    const body = request.body
    if (!request.token || !request.user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(request.user.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id,
        likes: body.likes || 0
    })

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

router.delete('/:id', async (request, response) => {
    const user = request.user

    if (!request.token || !user.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'User is not the creator of this blog' })
    }
})

router.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})

module.exports = router