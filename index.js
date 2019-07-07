
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const cors = require ('cors')
app.use(cors())


const zero = '<img src="./resources/zero" width="200" height="400"></img>'
const zero_skull = '<img src="./resources/zero_skull" width="200" height="400"></img>'
const one_sword = '<img src="./resources/one_sword" width="200" height="400"></img>'
const one_tower = '<img src="./resources/one_tower" width="200" height="400"></img>'
const two = '<img src="./resources/two" width="200" height="400"></img>'
const three = '<img src="./resources/three" width="200" height="400"></img>'



app.get('/', (req, res) => {
  res.send('<h1>Helflo World!</h1>')
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

