/**
 * @typedef {{
*  cardName: String,
*  cardIndex: Number,
*  cardOwner: String
* }} card
* 
* @typedef {{
*  cards: Array<card>,
*  ownCards: Array<card>,
*  othersCards: Array<card>,
*  waitingForSword: String,
*  swordOwner: String,
*  usernameOptions: Array<String>,
*  username: String,
*  endState: {
*       cards: Array<card>,
*       ownCards: Array<card>,
*       othersCards: Array<card>
*  } | null,
*  soundPlayed: Boolean
* }} cardsState
*/

export default {}