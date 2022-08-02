const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    hasSword: Boolean,
    stats: {
        self: {
            zero: Number,
            zero_skull: Number,
            one_sword: Number,
            one_tower: Number,
            two: Number,
            three: Number
        },
        against: {
            zero: Number,
            zero_skull: Number,
            one_sword: Number,
            one_tower: Number,
            two: Number,
            three: Number
        }
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('User', userSchema)