// This page is useless now, since it is copied to model/note.js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const url = `mongodb+srv://Andy123:${password}@notes.rncefsr.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'CSS is Hard',
    important: true,
})

// generate new notes
// result refers to the note object
/* note.save().then(result => {
    console.log('note saved!')
    console.log(result)
    mongoose.connection.close()
}) */

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// We could restrict our search to only include important notes like this:
/* Note.find({ important: true }).then(result => {
    // ...
}) */
