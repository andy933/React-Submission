require('dotenv').config()

const PORT = process.env.PORT
const MongoDB_URI = process.env.MongoDB_URI

module.exports = { PORT, MongoDB_URI }