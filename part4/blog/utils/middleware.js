const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
  }

const unknownPath = (request, response) => {
    response.status(404).send({ error: 'unknown path' })
}

const errorHandler = (err, request, response, next) => {
    logger.error(err.message.replace(':', ':\n').replaceAll('.', '').replaceAll(',', ',\n').concat('.'))

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return response.status(400).json({ error: err.message })
    }
    next(err)
}

module.exports = { requestLogger, unknownPath, errorHandler }