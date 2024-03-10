const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const usersRouter = require('./controller/users')
const blogsRouter = require('./controller/blogs')
const loginRouter = require('./controller/login')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MongoDB_URI)

mongoose.connect(config.MongoDB_URI).then(() => {
    logger.info('connection to Mongodb success')
})
  .catch(error => {
    logger.error('Error:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownPath)
app.use(middleware.errorHandler)


module.exports = app