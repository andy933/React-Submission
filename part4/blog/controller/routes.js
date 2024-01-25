const express = require('express')
const Blog = require('../models/blog')
const blogRoutes = express.Router()


blogRoutes.get('/', (request, response) => {
    Blog
      .find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogRoutes.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
        if (blog) {
            response.json(blog)
        }
        else {
            const id = request.path.replace(/^\/api\/blogs\//, '')
            response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
        }
    })
    .catch(error => next(error))
})

blogRoutes.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    const body = request.body

    if (blog.title === undefined || blog.author === undefined || blog.url === undefined || body.likes === undefined) {
        return response.status(400).send({ error: 'The value for title, author, url, or likes of the blog is missing!' })
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

blogRoutes.delete('/:id', (request, response, next) => {
Blog.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
})
    .catch(error => next(error))
})

module.exports = blogRoutes