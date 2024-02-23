const express = require('express')
const Blog = require('../models/blog')
const blogRoutes = express.Router()

blogRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRoutes.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    }
    else {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
})

blogRoutes.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRoutes.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRoutes.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body

    const updateBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        {title, author, url, likes},
        {new: true, runValidators: true, context: 'query'})
    response.json(updateBlog)
})

module.exports = blogRoutes