require('dotenv').config()
const Blog = require('./models/blog')
const express = require('express')
const app = express()
//const cors = require('cors')


//app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response, next) => {
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

app.post('/api/blogs', (request, response, next) => {
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

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

const unknownPath = (request, response) => {
  response.status(404).send({ error: 'unknown path' })
}

app.use(unknownPath)

const errorHandler = (err, request, response, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})