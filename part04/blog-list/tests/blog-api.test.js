const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const auth = { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ildpc2VXb2xmIiwiaWQiOiI2MTE0MzRkMDQ5OTViMjk4YTQ3ZGEzZmMiLCJpYXQiOjE2Mjg4MDkzODZ9.Pto8ofiCyG5qksUqXqoUQV_Skc3V6wEq6WmOPbk1GAs',
    'Content-Type': 'application/json' }

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'WiseWolf', name: 'Holo', passwordHash, 
        _id: '611434d04995b298a47da3fc', blogs: ['5a422a851b54a676234d17f7', '5a422b3a1b54a666634d17f9'] })
    await user.save()

    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when there is some blogs alredy saved', () => {
    test('blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .set(auth)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blog unique ID is named "id"', async () => {
        const response = await api
            .get('/api/blogs')
            .set(auth)
        response.body.map(blog => expect(blog).toHaveProperty('id'))

    })

    test('code 401 when no token is provided', async () => {
        await api
            .get('/api/blogs')
            .expect(401)
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
            userId: '611434d04995b298a47da3fc'
        }
        await api
            .post('/api/blogs')
            .set(auth)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api
            .get('/api/blogs')
            .set(auth)
        console.log('response.body', response.body)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('"likes" property is not missing from the request', async () => {
        const blogs = await api
            .get('/api/blogs')
            .set(auth)

        blogs.body.map(blog => expect(blog).toHaveProperty('likes'))
    })

    test('verified request with missing title and url properties returns 400', async () => {
        const newBlog = {
            _id: '5a422bc61b54a676234d17fc',
            author: 'Holo',
            likes: 666,
            userId: '611434d04995b298a47da3fc'
        }

        await api
            .post('/api/blogs')
            .set(auth)
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
            .set(auth)
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