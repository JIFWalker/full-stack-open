const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    console.log('database initialization complete')
})

describe('when there is some blogs alredy saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log('blog is in JSON format')

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
        console.log(`there are ${response.body.length} blogs`)
    })

    test('blog unique ID is named "id"', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog).toHaveProperty('id'))

    })
})

describe('when making a POST request', () => {
    test('HTTP POST request creates new blog post', async () => {
        const newBlog = {
            _id: '5a422bc61b54a676234d17fc',
            title: 'Spice & Wolf',
            author: 'Holo',
            url: 'http://blog.spicenadwolf.com',
            likes: 666,
            __v: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('"likes" property is not missing from the request', async () => {
        const blogs = await api.get('/api/blogs')

        blogs.body.map(blog => expect(blog).toHaveProperty('likes'))
    })

    test('verified request with missing title and url properties returns 400', async () => {
        const newBlog = {
            _id: '5a422bc61b54a676234d17fc',
            author: 'Holo',
            likes: 666,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('when manipulating a specific blog entry', () => {
    test('delete single blog entry from database', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )
    })
})

afterAll(() => {
    mongoose.connection.close()
})