import { useEffect, useState } from 'react'
import cardsService from 'services/cards'

/**
 * @typedef {import('./types').cardsState} cardsState
 */

// --> improve game end/ new session start 
//--> store end result in other property, 
//show all that until state 'isFrozen' is reset with click? --> ownCards are null anyway
const sseMsgActions = (data, setCardsState) => {
    try {
        const msgObj = JSON.parse(data)
        console.log(msgObj)

        switch (msgObj.msg) {
            case 'end':
                setCardsState(state => {
                    const { cards } = msgObj
                    const { username } = state
                    const othersCards = cards.filter(c => c.cardOwner !== '' && c.cardOwner !== username)
                    const ownCards = state.ownCards
                    let ownLastCard = ''
                    if (ownLastCard.length > 0) {
                        ownLastCard = ownCards[ownCards.length - 1].cardName
                    }

                    return {
                        ...state,
                        waitingForSword: '',
                        endState: {
                            cards,
                            othersCards,
                            ownCards: state.ownCards,
                            selectOrder: { ...state.selectOrder },
                            ownLastCard
                        },
                        cards: cardsArray(), //reset for new game --> keep endState visible
                        othersCards: [],
                        ownCards: [],
                        selectOrder: {},
                        soundPlayed: false
                    }
                })
                console.log('ROUND END')
                //--> set all cards this --> set ownCards & othersCards
                return

            case 'nosword':
                //just nice to know i guesS? --> should trigger 'end' action
                console.log(msgObj.username, 'NOSWORD')
                return

            case 'select':
                console.log('select')
                setCardsState(state => {
                    const { cardIndex, cardOwner } = msgObj
                    state.cards[cardIndex].cardOwner = cardOwner
                    if (!state.selectOrder[cardOwner]) {
                        state.selectOrder[cardOwner] = []
                    }
                    const playerOrderNew = [...state.selectOrder[cardOwner], cardIndex]

                    const selectOrderNew = { ...state.selectOrder, [cardOwner]: playerOrderNew }

                    return { ...state, selectOrder: selectOrderNew }
                })
                //use this to fill the cards array --> ownCards & othersCards to display on bottom side seperate
                return
            case 'forceEnd':
                //just nice to know
                console.log(msgObj.username, 'FORCE END')
                setCardsState(state => {
                    return {
                        ...state,
                        waitingForSword: '',
                        endState: null,
                        cards: cardsArray(), //reset for new game --> keep endState visible
                        othersCards: [],
                        ownCards: [],
                        selectOrder: {},
                        soundPlayed: false
                    }
                })
                return
            case 'too-many-users':
                //nice to know --> could pop out alert if wanted to
                console.log('TOO MANY USER SELECTED CARDS', msgObj.usernames)
                return
            case 'waiting-sword':
                //display sword button to this player 
                setCardsState(state => {
                    return {
                        ...state,
                        waitingForSword: msgObj.username
                    }
                })
                return
            case 'sword-change':
                console.log(msgObj.doneBy, 'SWORD USER CHANGED TO', msgObj.username)
                setCardsState(state => {
                    return {
                        ...state,
                        swordOwner: msgObj.username
                    }
                })
                return

            default:
                console.error('UNDEFINED SSE MSG', msgObj)
        }

    } catch (error) {
        console.error(error, data)
    }
}

let CARD_SUB = null
let CARD_SUB_TIMEOUT = null

const CardSubHandler = (setCardsState) => {
    //check if there is already an open/opening connection to prevent duplicate connection
    const cardSubState = CARD_SUB?.readyState
    if (cardSubState === 1 || cardSubState === 0) {
        //if its 1 = open or 0 = connecting --> dont open new one, return old sub as its still alive
        return
    }

    const cardSub = cardsService.cardsSSE()
    initThing(setCardsState)

    cardSub.onopen = () => {
        console.log('CARD SUB ACTIVE')
        initThing(setCardsState)
    }

    cardSub.onerror = () => {
        console.error('CARD SUB ERROR')
        cardSub.close()
        CARD_SUB_TIMEOUT = setTimeout(() => CardSubHandler(setCardsState), (2 * 1000))
    }
    cardSub.onmessage = (event) => {
        console.log('CSUB MSG')
        sseMsgActions(event.data, setCardsState)
    }
    CARD_SUB = cardSub
}

/**
 * Fetches current card states from db & updates view
 * Use on reloads/if sse connection is lost and reconnected
 * @param { React.Dispatch<React.SetStateAction<*>> } setCardsState card state
 */
const initThing = async (setCardsState) => {
    const data = await cardsService.initialLoad()
    const { swordOwner, ownCards, othersCards } = data
    const selectedCards = [...ownCards, ...othersCards]

    setCardsState(state => {
        const cards = state.cards
        selectedCards.forEach(c => {
            const { cardOwner, cardIndex } = c
            cards[cardIndex].cardOwner = cardOwner
        })
        return {
            ...state,
            cards,
            swordOwner,
            ownCards,
            othersCards,
            endState: null
        }
    })
}

const cardsArray = () => {
    let cardsArray = []
    for (let i = 0; i < 24; i++) {
        cardsArray.push({ cardName: '', cardOwner: '', cardIndex: i })
    }
    return cardsArray
}


/** @type {(username: String, usernameOptions: Array<String>) => cardsState} */
const defaultState = (username, usernameOptions) => ({
    cards: cardsArray(),
    ownCards: [],
    othersCards: [],
    waitingForSword: '', //username who's sword we are waiting
    swordOwner: '',
    usernameOptions: usernameOptions,
    username: username,
    selectOrder: {},
    endState: null,
    soundPlayed: false
})

/**
 * @param {String} username
 * @param {Array<String>} usernameOptions
 * @returns {[cardsState, Function]}
 */
const useCardsState = (username, usernameOptions) => {
    const [cardsState, setCardsState] = useState(() => defaultState(username, usernameOptions))


    useEffect(() => {
        CardSubHandler(setCardsState)

        return () => {
            if (CARD_SUB) {
                CARD_SUB.close()
            }
            if (CARD_SUB_TIMEOUT) {
                clearTimeout(CARD_SUB_TIMEOUT)
            }
        }
    }, [])

    return [cardsState, setCardsState]
}

export default useCardsState