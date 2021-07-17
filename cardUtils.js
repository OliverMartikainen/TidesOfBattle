const TIDE_CARDS_DATA = {
    'zero': { count: 8, name: 'zero' },
    'zero_skull': { count: 2, name: 'zero_skull' },
    'one_sword': { count: 4, name: 'one_sword' },
    'one_tower': { count: 4, name: 'one_tower' },
    'two': { count: 4, name: 'two' },
    'three': { count: 2, name: 'three' }
}

const organizedPackCreator = () => {
    const newPack = Object.values(TIDE_CARDS_DATA).reduce((arr, card) => {
        for (let i = 0; i < card.count; i++) {
            arr.push(card.name)
        }
        return arr
    }, [])

    return newPack
}


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

module.exports = {
    cardMixer
}