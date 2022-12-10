import { useEffect, useState } from 'react'
import cardsService from 'services/cards'

/**
 * @typedef {import('./types').cardsState} cardsState
 */
const sortCards = (cards) => cards.sort(
    (c1, c2) => c1.cardSelectTime - c2.cardSelectTime
)


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

                    const othersCardsUnsorted = cards.filter(c => !!c.cardOwner && c.cardOwner !== username)
                    const ownCardsUnsorted = cards.filter(c => c.cardOwner === username)
  
                    return {
                        ...state,
                        waitingForSword: '',
                        endState: {
                            cards,
                            othersCards: sortCards(othersCardsUnsorted),
                            ownCards: sortCards(ownCardsUnsorted),
                        },
                        cards: cardsArray(), //reset for new game --> keep endState visible
                        othersCards: [],
                        ownCards: [],
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
    
                    if (state.username === 'OBSERVER' && !!state.endState) {
                        state.endState = null
                    }
             
                    return { ...state }
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

/**
 * Fetches current card states from db & updates view
 * Use on reloads/if sse connection is lost and reconnected
 * @param { React.Dispatch<React.SetStateAction<*>> } setCardsState card state
 */
const initThing = async (setCardsState) => {
    console.log('INIT')
    const data = await cardsService.initialLoad()
    const { swordOwner, ownCards, othersCards } = data
    const selectedCards = [...ownCards, ...othersCards]

    setCardsState(oldState => {
        const cards = oldState.cards
        selectedCards.forEach(c => {
            const { cardOwner, cardIndex } = c
            cards[cardIndex].cardOwner = cardOwner
        })

        return {
            ...oldState,
            cards,
            swordOwner,
            ownCards,
            othersCards,
            endState: oldState.endState
        }
    })
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
    console.log('cardsubhandler run')
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
    endState: null,
    soundPlayed: false
})

/**
 * Should refactor to useReducer style custom hook --> but its late in the night and game starts in less than 12h
 * @param {String} username
 * @param {Array<String>} usernameOptions
 * @returns {[cardsState, { 
 *  handleCardSelect: (cardIndex: Number) => void, 
 *  refresh: () => void, 
 *  handleSwordSkip: () => void,
 *  forceReset: () => void,
 *  setSoundPlayed: () => void
 * }]}
 */
const useCardsState = (username, usernameOptions) => {
    const [cardsState, setCardsState] = useState(() => defaultState(username, usernameOptions))

    const isFrozeState = !!cardsState.endState

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

    const handleCardSelect = async (cardIndex) => {
        const { username, swordOwner, cards } = cardsState

        if (isFrozeState) return

        const card = cards[cardIndex]
        if (card.cardOwner !== '') return //should prevent selecting alreadt selected card --> check done in backend too

        //the rest of the picks are not preventend in backend atm.

        //check if non swordowner tries to pick a 2nd
        const selectedCards = cards.filter(c => c.cardOwner !== '')
        const ownCardsFiltered = selectedCards.filter(c => c.cardOwner === username)
        //0 selected --> no checks

        //1 selected --> prevent if its yours
        if (selectedCards.length === 1 && ownCardsFiltered.length === 1) return

        //2 selected --> prevent from picking unless you are one of the 2 and have sword
        if ((selectedCards.length === 2) && (ownCardsFiltered.length !== 1 || swordOwner !== username)) return

        const cardInfo = await cardsService.select(cardIndex)
        if (!cardInfo) return //should mean card is already selected by someone

        setCardsState(state => ({
            ...state,
            ownCards: [...state.ownCards, cardInfo]
        }))
    }

    const refresh = () => {
        setCardsState(state => ({ ...state, endState: null }))
    }

    const handleSwordSkip = async () => {
        if (isFrozeState) return

        if ((cardsState.swordOwner !== username)) return
        await cardsService.nosword()
    }

    const forceReset = async () => {
        if (isFrozeState) return

        await cardsService.forceEnd()
    }

    const setSoundPlayed = () => {
        setCardsState(state => ({ ...state, soundPlayed: true }))
    }

    return [cardsState, { 
        handleCardSelect,
        refresh,
        handleSwordSkip,
        forceReset,
        setSoundPlayed
    }]
}

export default useCardsState