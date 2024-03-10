const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        // token is a variable field, which can be renamed to other names like token123
        request.token = authorization.replace('Bearer ', '')
        // request["token"] = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({ error: 'User not found' })
    }
    request.user = user
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
    else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    else if (err.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    else if (err.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(err)
}

module.exports = { requestLogger, unknownPath, errorHandler, tokenExtractor, userExtractor }