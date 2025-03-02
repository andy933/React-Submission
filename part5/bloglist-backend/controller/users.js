const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, author: 1, title: 1})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    if (user) {
        response.json(user)
    }
    else {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if (username === undefined || password === undefined || username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: 'missing username and password or characters not enough'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
    const {blogs} = request.body
    const user = await User.findById(request.params.id)

    if (!user) {
        const id = request.params.id
        response.status(404).send(`<h1>There is no such of a resource from id: ${id}!</h1>`)
    }
    else {
        const updateUser = await User.findByIdAndUpdate(
            request.params.id,
            {blogs},
            {new: true, runValidators: true, context: 'query'})
        response.json(updateUser)
    }
})

usersRouter.delete('/', async (request, response) => {
    try 
    {
        await User.deleteMany({})
        response.status(204).end()
    } 
    catch (error) 
    {
        response.status(500).send({ error: 'Serivce errors occur that cannot delete users' })
    }     
})

module.exports = usersRouter