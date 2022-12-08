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
    /* /cards/sse will not use gzip compression -> EventSource has trouble understanding it*/
    if (req.url === '/sse') return false

    return compression.filter(req, res)
}

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MONGO_DB CONNECTED')
    } catch (error) {
        console.error(error)
    }
}

connectDb()


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
    response.send('UI MISSING')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ${new Date().toISOString()}`)
})
