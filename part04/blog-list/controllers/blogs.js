const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })

    if (blog) {
        response.json(blog)
    } else {
        response.status(400).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)

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
        console.log('added following to database', savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter