const express = require('express')
const cors = require('cors')
const compression = require('compression')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const { MONGO_URI } = require('./utils/config')

const app = express()

const cardsRouter = require('./controllers/cards')
const usersRouter = require('./controllers/users')

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false
    }
    /* with this the SSE route of /eventSubscriptions will not use gzip compression.
  Frontend doesnt understand gzip EventSource messages atm, no real reason to implement it either. */
    if (req.url === '/cards/sse') return false

    return compression.filter(req, res)
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, async () => {
    try {
        console.log('connected to MongoDB')
    } catch (error) {
        console.log('error connecting to MongoDB:', error.message)
    }
})


app.use(express.json())
app.use(cors())
app.use(compression({
    filter: shouldCompress,
}))

app.use(middleware.tokenExtractor)
app.use(middleware.requestTokenValidator)

app.use(express.static('build'))
app.use('/api/cards', cardsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, response) => {
    response.send('shits hit shit')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ${new Date().toISOString()}`)
})
