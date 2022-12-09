import one_sword from 'resources/one_sword_lite.jpg'
import one_tower from 'resources/one_tower_lite.jpg'
import zero from 'resources/zero_lite.jpg'
import zero_skull from 'resources/zero_skull_lite.jpg'
import two from 'resources/two_lite.jpg'
import three from 'resources/three_lite.jpg'
import backside from 'resources/backside_lite.jpg'

const TIDE_CARDS_DATA = {
    'zero': zero,
    'zero_skull': zero_skull,
    'one_sword': one_sword,
    'one_tower': one_tower,
    'two': two,
    'three': three
}

const TideCard = ({ card, username, handleSelect, className = 'tidecard-wrap' }) => {
    const { cardName, cardOwner, cardIndex } = card
    const img = TIDE_CARDS_DATA[cardName] || backside
    const alt = cardName || 'unknown'

    const color = cardOwner ? ((cardOwner === username) ? 'red' : 'cyan') : null

    const style = { backgroundColor: color } 

    return (
        <div
            className={className}
            style={style}
            onDoubleClick={() => handleSelect(cardIndex)}
        >
            <img className='tidecard' src={img} alt={alt} />
            CardOwner: {cardOwner}
        </div>
    )
}


export default TideCard