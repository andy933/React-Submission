const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  url: {
    type: String,
    minLength: 4,
    required: true
  },
  title: {
    type: String,
    minLength: 4,
    required: true
  },
  author: {
    type: String,
    minLength: 4,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
  },
  likes: {
    type: Number,
    min: 0,
    required: false
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
