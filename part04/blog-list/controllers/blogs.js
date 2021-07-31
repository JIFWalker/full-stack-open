const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    await blog.save()
    response.status(201).json(blog)
    console.log(blog)
})

module.exports = blogsRouter