const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})
  
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    }
    else {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (!blog) {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
    else if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(401).send({ error: 'Unauthorized user that cannot delete the blog'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
    else {
        const updateBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {title, author, url, likes},
            {new: true, runValidators: true, context: 'query'})
        response.json(updateBlog)
    }
})

module.exports = blogsRouter