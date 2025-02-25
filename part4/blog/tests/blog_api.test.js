const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlog = require('./test_helper').initialBlog
const initialUser = require('./test_helper').initialUser
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
let headers
beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    // await Blog.insertMany(initialBlog)
      
    const user = await api
        .post('/api/users')
        .send(initialUser[0])

    const result = await api
        .post('/api/login')
        .send(initialUser[0])

    headers = {
        'Authorization': `Bearer ${result.body.token}`
    }
    // This is to solve the 500 status error bug for delete request
    for (let blog of initialBlog) {
        blog['user'] = new mongoose.Types.ObjectId(user.body.id)
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
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
        
        // Bruteforce method to make them the same type to solve bug error
        blogToView['user'] = new mongoose.Types.ObjectId(blogToView['user'])
        resultBlog.body['user'] = new mongoose.Types.ObjectId(resultBlog.body['user'])

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
            title: 'test',
            author: 'test',
            url: 'test',
            likes: 10
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsInDb()
        const usersAtEnd = await helper.usersInDb()
         // _id: ObjectId type; id: String type
        const userId = usersAtEnd.map(u => u.id)
        const blogId = blogs.map(b => b.id)
        // Encounter type bugs for blog id and user id, very important!
        // Because the user id in Blog is ObjectId type instead of string
        expect(blogs).toHaveLength(initialBlog.length + 1)
        expect(blogs).toContainEqual({        
            id: blogId[2],
            title: 'test',
            author: 'test',
            url: 'test',
            user: new mongoose.Types.ObjectId(userId[0]),
            likes: 10
        })
    })

    test('a blog fails with the proper status code 401 unauthorized', async () => {
        const newBlog = {
            title: 'test',
            author: 'test',
            url: 'test',
            likes: 10
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .set({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NWRlZDkyMDg2Njk5Yzk5NDJiZDY4NWUiLCJpYXQiOjE3MDk0ODE3NTQsImV4cCI6MTcwOTQ4NTM1NH0.CI6QgahWpEbkXit3mGsiIdTHWc4OdCp7ggK7W25D3KA'
        })
        .expect(401)
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
        .set(headers)
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
        .set(headers)
        .expect(400)
    
        await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .set(headers)
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
        .set(headers)
        .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        expect(blogsAtEnd).not.toContainEqual(blogToDelete)
    })

    test('a blog fails with the proper status code 401 Unauthorized', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NWRlZDkyMDg2Njk5Yzk5NDJiZDY4NWUiLCJpYXQiOjE3MDk0ODE3NTQsImV4cCI6MTcwOTQ4NTM1NH0.CI6QgahWpEbkXit3mGsiIdTHWc4OdCp7ggK7W25D3KA'
        })
        .expect(401)
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

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('copycat', 10)
        const user = new User({ username: 'copy', name: 'cat', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: '68 problem solver',
            name: 'Aru',
            password: 'No.1 Villain'
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

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'copy',
            name: 'cat',
            password: 'newpw'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(result.body.error).toContain('expected `username` to be unique')

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
