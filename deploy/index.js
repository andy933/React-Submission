//const http = require('http') //node.js built in web server, is cumbersome than express library
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

/* const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})
 */

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// json-parser for request body
app.use(express.json())
// Middleware are functions for handling request and response objects
app.use(requestLogger)
app.use(unknownEndPoint)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// get all
app.get('/api/notes', (request, response) => {
  response.json(notes)
}) 

// get a single resource
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(n => {
    console.log(n.id, typeof n.id, id, typeof id, n.id === id)
    return n.id === id
  })

  if (note) {
    console.log(note)
    response.json(note)
  }
  else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

// post
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

// delete 
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(n => n.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

// The event handler function accepts two parameters. 
// The first request parameter contains all of the information of the HTTP request,
// and the second response parameter is used to define how the request is responded to.

// Express is better than http since it can automatically set content type and status code 200

//node_modules/.bin/nodemon index.js, or, npm run dev, refresh no restart
