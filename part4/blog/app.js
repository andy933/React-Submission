const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const express = require('express')
const blogRoutes = require('./controller/routes')
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
app.use('/api/blogs', blogRoutes)
app.use(middleware.unknownPath)

app.use(middleware.errorHandler)

module.exports = app