const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter = require('./controller/login')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

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


app.use('/api/users', usersRouter)
// Putting /api/blog here will cause bug that cannot extract token or user
app.use('/api/login', loginRouter)

app.use('/api/blogs', blogsRouter)
//app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)


app.use(middleware.unknownPath)
app.use(middleware.errorHandler)


module.exports = app