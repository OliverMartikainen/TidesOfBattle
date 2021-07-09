const express = require('express')
const cors = require('cors')
const compression = require('compression')

const app = express()


const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false
    }
    /* with this the SSE route of /eventSubscriptions will not use gzip compression.
  Frontend doesnt understand gzip EventSource messages atm, no real reason to implement it either. */
    if (req.url === '/eventSubscription') return false

    return compression.filter(req, res)
}


app.use(express.json())
app.use(cors())
app.use(compression({
    filter: shouldCompress,
}))

app.use(express.static('build'))


app.get('/', (req, response) => {
    response.send('shits hit shit')
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
