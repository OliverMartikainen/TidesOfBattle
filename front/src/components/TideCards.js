import { useEffect, useState } from 'react'
import config from 'utils/config'
import TideCard from './TideCard'
import NativeSelector from './NativeSelector'
import cardsService from 'services/cards'
import usersService from 'services/users'
import mlgHorn from 'resources/mlgHorn.mp3'

// --> improve game end/ new session start 
//--> store end result in other property, 
//show all that until state 'isFrozen' is reset with click? --> ownCards are null anyway
const sseMsgActions = (data, setCardStates) => {
    try {
        const msgObj = JSON.parse(data)

        switch (msgObj.msg) {
            case 'end':
                setCardStates(state => {
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
                setCardStates(state => {
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
                setCardStates(state => {
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
                setCardStates(state => {
                    return {
                        ...state,
                        waitingForSword: msgObj.username
                    }
                })
                return
            case 'sword-change':
                console.log(msgObj.doneBy, 'SWORD USER CHANGED TO', msgObj.username)
                setCardStates(state => {
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
 * @param { React.Dispatch<React.SetStateAction<*>> } setCardStates card state
 */
const initThing = async (setCardStates) => {
    const data = await cardsService.initialLoad()
    const { swordOwner, ownCards, othersCards } = data
    const selectedCards = [...ownCards, ...othersCards]

    setCardStates(state => {
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

let CARD_SUB = null
let CARD_SUB_TIMEOUT = null

const CardSubHandler = (setCardStates) => {
    //check if there is already an open/opening connection to prevent duplicate connection
    const cardSubState = CARD_SUB?.readyState
    if (cardSubState === 1 || cardSubState === 0) {
        //if its 1 = open or 0 = connecting --> dont open new one, return old sub as its still alive
        return
    }

    const cardSub = cardsService.cardsSSE()
    initThing(setCardStates)

    cardSub.onopen = () => {
        console.log('CARD SUB ACTIVE')
        initThing(setCardStates)
    }

    cardSub.onerror = () => {
        console.error('CARD SUB ERROR')
        cardSub.close()
        CARD_SUB_TIMEOUT = setTimeout(() => CardSubHandler(setCardStates), (2 * 1000))
    }
    cardSub.onmessage = (event) => {
        console.log('CSUB MSG')
        sseMsgActions(event.data, setCardStates)
    }
    CARD_SUB = cardSub
}

const SwordUserSelector = ({ cardStates }) => {
    const isSwordOwner = cardStates.swordOwner === cardStates.username

    const handleChange = async (value) => {
        const username = value
        if (username === cardStates.swordOwner || !isSwordOwner) return

        await usersService.changeSwordUser(username)
    }

    return (
        <NativeSelector
            value={ cardStates.swordOwner }
            valueOptions={ cardStates.usernameOptions }
            handleChange={ handleChange }
            label={ 'SwordOwner' }
            disabled={ !isSwordOwner }
        />
    )
}

const cardsArray = () => {
    let cardsArray = []
    for (let i = 0; i < 24; i++) {
        cardsArray.push({ cardName: '', cardOwner: '', cardIndex: i })
    }
    return cardsArray
}

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

const TideCards = ({ username, usernameOptions, logout }) => {
    const [cardStates, setCardStates] = useState(() => defaultState(username, usernameOptions))

    const isFrozeState = !!cardStates.endState
    let { cards, ownCards, othersCards } = (cardStates.endState) ? cardStates.endState : cardStates


    useEffect(() => {
        CardSubHandler(setCardStates)

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
        if (isFrozeState) return
        const { username, swordOwner, cards } = cardStates

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

        setCardStates(state => {
            return {
                ...state,
                ownCards: [...state.ownCards, cardInfo]
            }
        })
    }

    const refresh = () => {
        setCardStates(state => ({ ...state, endState: null }))
    }

    const handleSwordSkip = async () => {
        if (isFrozeState) return

        if ((cardStates.swordOwner !== username)) return
        await cardsService.nosword()
    }

    const forceReset = async () => {
        if (isFrozeState) return

        await cardsService.forceEnd()
    }

    const cardComps = cards.map((card) => {
        return <TideCard key={ card.cardIndex } username={ username } card={ card } handleSelect={ handleCardSelect } />
    })



    const otherPlayers = Object.keys(othersCards.reduce((obj, card) => {
        obj[card.cardOwner] = card.cardOwner
        return obj
    }, {}))

    const otherPlayersCards = otherPlayers.reduce((obj, player) => {
        const playerCards = othersCards.filter(c => c.cardOwner === player)

        let playerCardsOrdered = [...playerCards]
        const playerSelectOrder = cardStates?.endState?.selectOrder[player]
        const orderKnown = playerSelectOrder && playerSelectOrder.length === playerCards.length
        if (orderKnown) {
            playerCardsOrdered = playerSelectOrder.map(selectNumb => playerCards.find(c => c.cardIndex === selectNumb))
        } else {
            console.log('ORDER NOT KNOWN', player)
        }
        obj[player] = { cards: playerCardsOrdered, orderKnown, playerName: player }
        return obj
    }, {})


    const ownCardComps = ownCards.map((card) => <TideCard key={ card.cardIndex } username={ username } card={ card } handleSelect={ null } className='tidecard-small' />)

    const otherPlayersOrdered = Object.values(otherPlayersCards)
    const othersCardsComps = otherPlayersOrdered.map((data) => {
        const cardsComp = data.cards.map(c => <TideCard key={ c.cardIndex } username={ username } card={ c } handleSelect={ null } className='tidecard-small' />)
        return (
            <div key={ data.playerName } style={ { borderRight: '3px solid black', paddingRight: 3 } }>
                <div key={ data.playerName } className='player-cards-holder' >
                    { cardsComp }
                </div>
                OrderKnown: { data.orderKnown + '' }
            </div>
        )
    })

    const isSwordOwner = (cardStates.swordOwner === username)

    let isSwordBtnEnabled = false
    if (isSwordOwner) {
        //check if 2 cards are selected and 1 is yours 
        //--> waiting for you to decide if you use the sword or not
        const selectedCards = cardStates.cards.filter(c => c.cardOwner !== '')
        const ownCards = selectedCards.filter(c => c.cardOwner === username)
        if (selectedCards.length === 2 && ownCards.length === 1) {
            isSwordBtnEnabled = true
        }
    }

    const playSound = () => {
        try {
            const audioEl = document.getElementsByClassName('mlgHorn')[0]
            audioEl.play()
        } catch (error) {
            console.error(error)
        }
    }

    if (isFrozeState && !cardStates.soundPlayed) {
        const frozenOwnCards = cardStates.endState?.ownCards || []
        console.log(cardStates)
        if (frozenOwnCards.length > 0) {
            const lastOwnName = frozenOwnCards[frozenOwnCards.length - 1].cardName
            if (lastOwnName === 'zero_skull') {
                playSound()
                setCardStates(state => ({ ...state, soundPlayed: true }))
            }
        }
    }


    return (
        <div>
            { config.NODE_ENV === 'development' && <button onClick={ playSound }>PLAY</button> }
            <audio className='mlgHorn' >
                <source src={ mlgHorn }></source>
            </audio>
            <div style={ { display: 'flex' } }>
                <button onClick={ logout } >Logout - { username }</button>
                <SwordUserSelector cardStates={ cardStates } />
                <button disabled={ !cardStates.endState } onClick={ refresh } >REFRESH</button>
            </div>
            <div style={ { display: 'grid' } }>
                <div className='player-cards-holder' >
                    { cardComps }
                </div>
                { isSwordOwner &&
                    <button disabled={ !isSwordBtnEnabled } onClick={ handleSwordSkip }>
                        DONT USE SWORD
                    </button> }
                <div>
                    <div className='player-cards-holder' >
                        { ownCardComps }
                        <div className='divider'></div>
                        { othersCardsComps }
                    </div>
                </div>
                <div style={ { height: 55 } }></div>
                { isSwordOwner &&
                    <button onClick={ forceReset } disabled={ isFrozeState }>
                        FORCE RESET - FOR BUGS ONLY
                    </button> }
            </div >
        </div>
    )

}


export default TideCards