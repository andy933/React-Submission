const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url).then(() => {
  console.log('connection to Mongodb success')
})
  .catch(error => {
    console.log('Error:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true
  },
  author: {
    type: String,
    minLength: 5,
    required: true
  },
  url: {
    type: String,
    minLength: 10,
    required: true
  },
  likes: {
    type: Number,
    min: 1,
    required: true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
