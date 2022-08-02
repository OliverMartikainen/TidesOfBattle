const Card = require('../models/card')


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

const initCards = async () => {
    //remove previous entries
    await Card.deleteMany({})

    const mixedCards = cardMixer().map((card, index) => ({ cardName: card, cardIndex: index, cardOwner: '' }))
    try {
        await Card.insertMany(mixedCards)
        return true
    } catch (error) {
        return false
    }
}


const selectCard = async (index, owner) => {
    //new: true --> returns the updated card --> returns truth value only if given index is not selected by anyone
    const card = await Card.findOneAndUpdate({ cardIndex: index, cardOwner: '' }, { cardOwner: owner }, { new: true })
    if (!card) return null

    return card.toJSON()
}

const getCards = async () => {
    const allCards = await Card.find()
    if (!allCards) return []

    return allCards.map(card => card.toJSON())
}

const getSelectedCards = async (username) => {
    const allCards = await getCards()

    const selectedCards = allCards.filter(c => c.cardOwner !== '')
    if (selectedCards.length === 0) return { ownCards: [], othersCards: [] }

    const ownCards = selectedCards.filter(c => c.cardOwner === username)
    const othersCards = selectedCards.filter(c => c.cardOwner !== username).map(c => ({
        ...c,
        cardName: ''
    }))
    return { ownCards, othersCards }
}

module.exports = {
    initCards,
    selectCard,
    getCards,
    getSelectedCards
}