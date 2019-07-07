const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const cors = require ('cors')
app.use(cors())
app.use(express.static('build'))

const zero_skull = new Card('./resources/zero_skull')
const zero = new Card('./resources/zero')
const one_sword = new Card('./resources/one_sword')
const one_tower = new Card('./resources/one_tower')
const two = new Card('./resources/two')
const three = new Card('./resources/three')



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/zero', (req, response) => {
  if (zero) {
    response.json(zero)
  }
  else {
    response.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

