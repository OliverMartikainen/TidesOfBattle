import ReactDOM from 'react-dom'
import React from 'react'
import App from './src/App'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const cards = [
  {
    id: "zero",
    path: "./resources/zero"
  },
  {
    id: "zero_skull",
    path: `./resources/zero_skull`
  },
  {
    id: "one_sword",
    path: `./resources/one_sword`
  },
  {
    id: "one_tower",
    path: `./resources/one_tower`
  },
  {
    id: "two",
    path: `./resources/two`
  },
  {
    id: "three",
    path: `./resources/three`
  }
]

'<img src="./resources/zero_skull" width="200" height="400"></img>'



app.get('/cards', (req, response) => {
  if (cards) {
    response.json(cards)
  }
  else {
    response.status(404).end()
  }
})

app.get('/cards/:id', (req, response) => {
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
