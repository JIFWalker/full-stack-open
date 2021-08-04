const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})

    if (blog) {
        response.json(blog)
    } else {
        response.status(400).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    if (!blog.title || !blog.url) {
        await response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
        console.log('added following to database', savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter