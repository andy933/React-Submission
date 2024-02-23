const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlog = require('./test_helper').initialBlog
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlog)
})

describe('when there is initially some notes save', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlog.length)
    })
    
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const title = response.body.map(r => r.title)
        expect(title).toContain('Blue Archive')
    })
    
    test('blog posts with id property', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body.map(r => r.id)
        expect(id).toBeDefined()
    })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToView = blogAtStart[0]

        const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonexistingId()

        await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if note is invalid', async () => {
        const invalidId = '65b1f884d21e633dada6adas'

        await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'testing',
            author: 'testing',
            url: 'testing',
            likes: 10
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        // if the object has id, the comparison will be incorrect
        for (let i of blogs) {
            delete i.id
        }
        expect(blogs).toHaveLength(initialBlog.length + 1)
        expect(blogs).toContainEqual(newBlog)
    })

    test('a blog missing the likes property', async () => {
        const newBlog = {
            title: 'Raid Event',
            author: 'Peroro',
            url: 'https://www.peroro.com'
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        const newBlogElement = blogs.find(b => b.title === 'Raid Event')
        expect(newBlogElement.likes).toBe(0)
    })
    
    test('a blog missing the title or url property', async () => {
        const noTitleBlog = {
            author: 'Peroro',
            url: 'https://www.peroro.com',
            likes: 100
        }   
        
        const noUrlBlog = {
            title: 'Raid Event',
            author: 'Peroro',
            likes: 100
        }
    
        await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
    
        await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)
    
        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(initialBlog.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    
        for (let i of blogsAtEnd) {
            delete i.id
        }
        expect(blogsAtEnd).not.toContainEqual(blogToDelete)
    })
})

describe('update of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogBeforeUpdate = blogsAtStart[0]
        const updateContent = {
            title: 'Lobotomy Kaisen',
            author: 'Gege Kiler',
            url: 'killer.com',
            likes: 9000
        }
    
        await api
        .put(`/api/blogs/${blogBeforeUpdate.id}`)
        .send(updateContent)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    
        expect(blogsAtEnd[0]).not.toEqual(blogBeforeUpdate)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})
