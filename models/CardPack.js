const mongoose = require('mongoose')
const { MONGO_PASS, MONGO_USER, MONGO_ADDRESS } = require('../utils/config')

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_ADDRESS}`

const TIDE_CARDS_DATA = {
    'zero': { count: 8, name: 'zero' },
    'zero_skull': { count: 2, name: 'zero_skull' },
    'one_sword': { count: 4, name: 'one_sword' },
    'one_tower': { count: 4, name: 'one_tower' },
    'two': { count: 4, name: 'two' },
    'three': { count: 2, name: 'three' }
}

//create an organized card pack
const organizedPackCreator = () => {
    const newPack = Object.values(TIDE_CARDS_DATA).reduce((arr, card) => {
        for (let i = 0; i < card.count; i++) {
            arr.push(card.name)
        }
        return arr
    }, [])

    return newPack
}

//create a randomized order cardpack
const cardMixer = () => {
    const defaultPack = organizedPackCreator()
    const mixedPack = []
    while (defaultPack.length > 0) {
        const numb = Math.floor(Math.random() * defaultPack.length) //0 to (length-1) basically --> round gives smaller chance to edge numbers
        const pickedCard = defaultPack.splice(numb, 1)
        mixedPack.push(pickedCard[0])
    }
    return mixedPack
}


const cardSchema = new mongoose.Schema({
    cardName: String,
    cardIndex: Number,
    cardOwner: String,
})

const cardPackSchema = new mongoose.Schema({ cards: [cardSchema] })

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, async (result) => {
    try {
        console.log('connected to MongoDB')
    } catch (error) {
        console.log('error connecting to MongoDB:', error.message)
    }
})
//.then(result => { console.log('connected to MongoDB') }).catch((error) => { console.log('error connecting to MongoDB:', error.message) })

cardPackSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('CardPack', cardPackSchema)
