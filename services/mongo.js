const mongoose = require('mongoose')
const { MONGO_PASS, MONGO_USER, MONGO_ADDRESS } = require('../utils/config')

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_ADDRESS}`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})

note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
})
