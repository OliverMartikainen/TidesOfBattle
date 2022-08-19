const cardRouter = require('express').Router()
const cards = require('../cache/cards')
const users = require('../cache/users')

const { SSE_EMMITTER } = require('../utils/config')

const endCardSet = async (app) => {
    console.log('end cards')
    const allCards = await cards.getCards()
    cards.initCards() //refresh db cards
    app.emit(SSE_EMMITTER, { msg: 'end', cards: allCards }) //send all card info to frontend

    try {


        //update statistics for each player
        const allPlayerCards = allCards.filter(card => card.cardOwner !== '')

        const cardsByPlayer = allPlayerCards.reduce((obj, card) => {
            let ownerCards = obj[card.cardOwner]
            if (!ownerCards) {
                ownerCards = []
            }
            ownerCards.push(card.cardName)
            obj[card.cardOwner] = ownerCards
            return obj
        }, {})

        const players = Object.keys(cardsByPlayer)
        players.forEach(name => {
            const ownCards = cardsByPlayer[name]
            const otherPlayers = players.filter(n => n !== name)
            const othersCardsArrs = otherPlayers.map(n => cardsByPlayer[n])
            const otherCards = [].concat(...othersCardsArrs)

            users.updateUserStats(name, ownCards, otherCards)
        })
    } catch (error) {
        console.error(error)
    }
}

const checkForEnd = async (app) => {
    console.log('end check')
    console.time('check')
    const [allCards, allUsers] = await Promise.all([cards.getCards(), users.getUsers()])
    const userCards = allCards.filter(card => card.cardOwner !== '')

    if (userCards.length === 2) {
        //check if user who played has swords
        let swordUserPresent = false
        let swordUserName = ''
        userCards.forEach(card => {
            const username = card.cardOwner
            const user = allUsers.find(user => user.username === username)
            if (user.hasSword) {
                swordUserPresent = true
                swordUserName = username
            }
        })

        if (swordUserPresent) {
            app.emit(SSE_EMMITTER, { msg: 'waiting-sword', username: swordUserName })
        } else {
            endCardSet(app)
        }
        console.timeEnd('check')

        return
    }

    if (userCards.length >= 3) {
        const uniqueNames = userCards.reduce((obj, card) => {
            obj[card.cardOwner] = card.cardOwner
            return obj
        }, {})
        const uniqueCount = Object.keys(uniqueNames).length
        if (uniqueCount >= 3) {
            app.emit(SSE_EMMITTER, { msg: 'too-many-users', usernames: Object.keys(uniqueNames) })
        }

        endCardSet(app)
        console.timeEnd('check')

        return
    }
    console.timeEnd('check')

}


cardRouter.post('/select', async (req, res) => {
    const { cardIndex } = req.body
    //check username is valid? who cares, app used by friends only

    // @ts-ignore - added to req in middleware
    const username = req.username

    //check from mongo if reserved --> then mark as reserved
    const card = await cards.selectCard(cardIndex, username)
    if (!card) {
        res.status(400).send({ error: 'Invalid card' })
        return
    }

    //send SSE push to others that cardIndex chosen by username
    res.status(200).send({ card: card })
    res.app.emit(SSE_EMMITTER, { msg: 'select', cardOwner: username, cardIndex })
    
    //give reserved/not reserved status?? --> return selected cards info
    checkForEnd(res.app)
})


cardRouter.get('/forceEnd', async (req, res) => {
    // @ts-ignore - added to req in middleware
    const username = req.username

    res.app.emit(SSE_EMMITTER, { msg: 'forceEnd', username })
    endCardSet(res.app)
    res.status(204).send()
})

cardRouter.get('/nosword', async (req, res) => {
    // @ts-ignore - added to req in middleware
    const username = req.username

    if (!await users.isSwordUser(username)) {
        res.status(401).send('You are not the sword user')
        return
    }

    res.app.emit(SSE_EMMITTER, { msg: 'nosword', username })

    endCardSet(res.app)
    res.status(204).send()
})

cardRouter.get('/initialLoad', async (req, res) => {
    // @ts-ignore - added to req in middleware
    const username = req.username

    const [swordOwner, selectedCards] = await Promise.all([users.getSwordUser(), cards.getSelectedCards(username)])
    return res.status(200).send({ swordOwner, selectedCards })
})

//exempt from token
cardRouter.get('/sse', async (req, res) => {
    console.log(`CARDSSE SUB GAIN: ${req.ip} - LISTENER COUNT: ${res.app.listenerCount(SSE_EMMITTER) + 1}`)

    
    res.status(200).set({
        'connection': 'keep-alive',
        'cache-control': 'no-cache',
        'content-Type': 'text/event-stream'
    })
    
    const eventUpdateListener = (data) => {
        try {
            res.write(`data: ${JSON.stringify(data)}\n\n`)
        } catch (error) {
            console.error('CARDROUTER SSE FAILURE', error)
        }
    }

    if(!req.ip) {
        console.error('ERROR REQUEST ' + req.ip + ' ' + req.rawHeaders)
        res.app.removeListener(SSE_EMMITTER, eventUpdateListener)
    } else {
        res.app.on(SSE_EMMITTER, eventUpdateListener)
    }

    
    req.on('close', () => {
        console.log(`CARDSSE SUB LOST: ${req.ip} - LISTENER COUNT: ${res.app.listenerCount(SSE_EMMITTER) - 1}`)
        res.app.removeListener(SSE_EMMITTER, eventUpdateListener)
    })
})


module.exports = cardRouter