import useCardsState from './useCardsState'
import TideCard from './TideCard'
import NativeSelector from './NativeSelector'
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
            value={cardStates.swordOwner}
            valueOptions={cardStates.usernameOptions}
            handleChange={handleChange}
            label={'SwordOwner'}
            disabled={!isSwordOwner}
        />
    )
}

const createCardComps = (cards, username) => cards.map((card, index) => <TideCard
    key={card.cardIndex}
    username={username}
    card={card}
    isPrimary={cards.length === (index+1)} //if last card --> priority card (sorted with high priority last)
/>)

const sortCards = (cards) => cards.sort(
    (c1, c2) => c1.cardSelectTime - c2.cardSelectTime
)

/** return sorted arrs in object with name as index */
const createOtherPlayersCardsIndex = (othersCards) => {
    const otherPlayerNamesList = Object.keys(
        othersCards.reduce((obj, card) => {
            obj[card.cardOwner] = card.cardOwner
            return obj
        }, {})
    )

    const otherPlayersCards = otherPlayerNamesList.reduce((obj, player) => {
        const playerCards = othersCards.filter((c) => c.cardOwner === player)

        const playerCardsOrdered = sortCards(playerCards)

        obj[player] = { cards: playerCardsOrdered, playerName: player }
        return obj
    }, {})
    return otherPlayersCards
}

const TideCards = ({ username, usernameOptions, logout }) => {
    const [cardStates, cardStateActions] = useCardsState(
        username,
        usernameOptions
    )

    const IS_FRONZEN_STATE = !!cardStates.endState
    const IS_SWORD_OWNER = cardStates.swordOwner === username

    const {
        handleCardSelect,
        handleSwordSkip,
        refresh,
        forceReset,
        setSoundPlayed,
    } = cardStateActions

    let { cards, ownCards, othersCards } = cardStates.endState
        ? cardStates.endState
        : cardStates


    const otherPlayersCards = createOtherPlayersCardsIndex(othersCards)

    const allCardComps = cards.map((card) => <TideCard
        key={card.cardIndex}
        username={username}
        card={card}
        handleSelect={handleCardSelect}
    />)

    const ownCardComps = createCardComps(ownCards, username)

    const otherPlayersOrdered = Object.values(otherPlayersCards)

    const othersCardsComps = otherPlayersOrdered.map((data) => {
        const cardsComp = createCardComps(data.cards, username)
        return (
            <div className="others-cards" key={data.playerName}>
                <div key={data.playerName} className="player-cards-holder">
                    {cardsComp}
                </div>
            </div>
        )
    })


    let isSwordBtnEnabled = false
    if (IS_SWORD_OWNER) {
    //check if 2 cards are selected and 1 is yours
    //--> waiting for you to decide if you use the sword or not
        const selectedCards = cardStates.cards.filter((c) => c.cardOwner !== '')
        const ownCards = selectedCards.filter((c) => c.cardOwner === username)
        if (selectedCards.length === 2 && ownCards.length === 1) {
            isSwordBtnEnabled = true
        }
    }
    if (cardStates.endState && !cardStates.soundPlayed) {
        let shouldPlaySound = false

        if(username === 'OBSERVER') {
            //play if either player has skull as last
            const endOthersCards = cardStates.endState?.othersCards
            const otherPlayersCards = createOtherPlayersCardsIndex(endOthersCards)

            //i think i can assume its in correct order?
            const values = Object.values(otherPlayersCards)
            values.forEach(playerInfo => {
                const cards = playerInfo.cards
                console.log(cards[cards.length - 1]?.cardName === 'zero_skull')
                if(cards[cards.length - 1]?.cardName === 'zero_skull') {
                    shouldPlaySound = true
                }
            })
        } else {
            console.log(cardStates) 

            //only play for own cards if not OBSERVER
            const frozenOwnCards = cardStates.endState?.ownCards || []
            frozenOwnCards
            //if (frozenOwnCards.length > 0 || cardStates.endState?.)
            if (frozenOwnCards?.[frozenOwnCards.length - 1]?.cardName === 'zero_skull') {
                shouldPlaySound = true
            }
        }
        
        if(shouldPlaySound) {
            playSound()
            setSoundPlayed()
        }
    }

    return (
        <div>
            <div className="control-buttons">
                <button disabled={!IS_FRONZEN_STATE} onClick={refresh}>REFRESH</button>
                <SwordUserSelector cardStates={cardStates} />
                <button onClick={logout}>Logout - {username}</button>
            </div>
            <div style={{ display: 'grid' }}>
                <div className="player-cards-holder">{allCardComps}</div>
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {IS_SWORD_OWNER && (
                        <button disabled={!isSwordBtnEnabled} onClick={handleSwordSkip}>
                            DONT USE SWORD
                        </button>
                    )}
                </div>

                <div className="player-cards-holder">
                    {ownCardComps}
                    <div className="divider"></div>
                    {othersCardsComps}
                </div>

                <div style={{ height: 40 }}></div>
            </div>
            <div style={{ paddingTop: '5px', paddingBottom: '15px' }}>
                {IS_SWORD_OWNER && (
                    <button onClick={forceReset}>FORCE RESET - FOR BUGS ONLY</button>
                )}
            </div>
        </div>
    )
}

export default TideCards
