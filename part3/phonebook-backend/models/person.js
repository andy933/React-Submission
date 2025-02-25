const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error catching to MongoDB', error.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        // must use regex expression here
        return /^\d{2,3}-\d{5,}/.test(v) && v.replaceAll('-', '').length >= 8
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

// the beginning of the line of data: '^', can prevent special incorrect cases like '10-22-334455' and '1-12-148948'
// Since regrex expression is finding a pattern from a whole sentence, instead of STARTING from the Beginning,
// only using /\d{2}-\d{5,}/.test(v) will allow incorrect cases like '10-22-334455' and '1-12-148948' to proceed

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)