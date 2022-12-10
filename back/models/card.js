const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardName: String,
    cardIndex: Number,
    cardOwner: String,
    cardSelectTime: Number
})

cardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Card', cardSchema)
