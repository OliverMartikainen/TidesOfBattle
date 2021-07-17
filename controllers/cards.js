const cardRouter = require('express').Router()

const CARDS_EMMITTER = 'CARDS_SSE'

cardRouter.get('/', (req, res) => {
    //return entire pack --> array<{cardName: 'preselected options', username: personwhoselectedit || null}
    
    //this is for the final reveal part

    return res.status(200).send('abc')
})

cardRouter.post('/select', (req, res) => {
    const { username, cardIndex, cardName } = req.body
    //mark index in question as selected by username

    //check username is valid? who cares, app used by friends only


    //send SSE push to others that cardIndex chosen by username
    res.app.emit(CARDS_EMMITTER, { msg: 'cardSelect', username, cardIndex, cardName })

    return res.status(204)
})


cardRouter.get('/sse', async (req, res) => {
    console.log(`CARDSSE SUB GAIN: ${req.ip} - LISTENER COUNT: ${res.app.listenerCount(CARDS_EMMITTER) + 1}`)

    res.status(200).set({
        'connection': 'keep-alive',
        'cache-control': 'no-cache',
        'content-Type': 'text/event-stream'
    })

    const eventUpdateListener = (data) => {
        try {
            res.write(`data: ${JSON.stringify(data)}\n\n`)
        } catch (error) {
            console.error(`CARDROUTER SSE FAILURE ${error}`)
        }
    }

    res.app.on(CARDS_EMMITTER, eventUpdateListener)
    req.on('close', () => {
        console.log(`CARDSSE SUB LOST: ${req.ip} - LISTENER COUNT: ${res.app.listenerCount(CARDS_EMMITTER) - 1}`)
        res.app.removeListener(CARDS_EMMITTER, eventUpdateListener)
    })
})


module.exports = cardRouter