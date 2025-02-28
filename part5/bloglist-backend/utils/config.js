require('dotenv').config()

const PORT = process.env.PORT
const MongoDB_URI = process.env.NODE_ENV === 'play' 
? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = { PORT, MongoDB_URI }