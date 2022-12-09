import useCardsState from './useCardsState'
import TideCard from './TideCard'
import NativeSelector from './NativeSelector'
import cardsService from 'services/cards'
import usersService from 'services/users'
import { playSound } from 'components/mlgAudio'

import './TideCards.css'

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

const TideCards = ({ username, usernameOptions, logout }) => {
    const [cardStates, setCardStates] = useCardsState(username, usernameOptions)

    const isFrozeState = !!cardStates.endState
    let { cards, ownCards, othersCards } = (cardStates.endState) ? cardStates.endState : cardStates


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
            <div className="others-cards" key={ data.playerName } >
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



    if (isFrozeState && !cardStates.soundPlayed) {
        const frozenOwnCards = cardStates.endState?.ownCards || []

        console.log(cardStates)
        //if (frozenOwnCards.length > 0 || cardStates.endState?.)
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