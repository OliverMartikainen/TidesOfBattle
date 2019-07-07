const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.use(express.static('build'))

const cards = [
  {
    id: "zero",
    path: "./resources/zero"
  },
  {
    id: "zero_skull",
    path: `./resources/zero_skull.jpg`
  },
  {
    id: "one_sword",
    path: `./resources/one_sword.jpg`
  },
  {
    id: "one_tower",
    path: `./resources/one_tower.jpg`
  },
  {
    id: "two",
    path: `./resources/two.jpg`
  },
  {
    id: "three",
    path: `./resources/three.jpg`
  }
]


app.get('/', (req, response) => {
  response.send("shits hit shit")
})

app.get('/cards', (req, response) => {
  if (cards) {
    response.json(cards)
  }
  else {
    response.status(404).end()
  }
})

app.get('/cards/:id', (req, response) => {
  console.log("shitshithsit")

  if (cards) {
    const id = req.params.id
    const card = cards.find(card => card.id === id)
    response.json(card)
  }
  else {
    response.status(404).end()
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
