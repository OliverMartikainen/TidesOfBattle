import React, { useState, useEffect } from 'react'
import cardServices from './services/cards'
import './App.css'

const Card = ({ card }) => {
  return (
    <img source={card} heigth="200" width="200" />
  )
}

const giveRandomNumb = () => {
  const numb = Math.round(Math.random() * 24)
  if (numb < 9) {
    return "zero"
  }
  if (numb < 11) {
    return "zero_skull"
  }
  if (numb < 15) {
    return "one_sword"
  }
  if (numb < 19) {
    return "one_tower"
  }
  if (numb < 23) {
    return "two"
  }
  return "three"
}


const App = () => {
  const [cards, setCards] = useState([])
  const [card, setCard] = useState()

  useEffect(() => {
    cardServices
      .getAll()
      .then(cardData => {
        setCards(cardData)
      })
  }, [])

  const crawCard = () => {
    const draw = giveRandomNumb()
    setCard(cards.find(card => card.id === draw))
  }

  return (
    <div>
      <button onClick={drawCard()}>Draw Card</button>

      <Card card={card} />


      <h3>Add a new</h3>
    </div>
  )
}

export default App