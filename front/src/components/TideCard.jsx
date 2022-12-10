import one_sword from 'resources/one_sword_lite.jpg'
import one_tower from 'resources/one_tower_lite.jpg'
import zero from 'resources/zero_lite.jpg'
import zero_skull from 'resources/zero_skull_lite.jpg'
import two from 'resources/two_lite.jpg'
import three from 'resources/three_lite.jpg'
import backside from 'resources/backside_lite.jpg'

import './TideCard.css'

const IMG_CLASSNAME = 'tidecard-img'

const TIDE_CARDS_DATA = {
    'zero': <img className={IMG_CLASSNAME} src={zero} alt={'zero'} />,
    'zero_skull': <img className={IMG_CLASSNAME} src={zero_skull} alt={'zero_skull'} />,
    'one_sword': <img className={IMG_CLASSNAME} src={one_sword} alt={'one_sword'} />,
    'one_tower': <img className={IMG_CLASSNAME} src={one_tower} alt={'one_tower'} />,
    'two': <img className={IMG_CLASSNAME} src={two} alt={'two'} />,
    'three': <img className={IMG_CLASSNAME} src={three} alt={'three'} />,
    'backside': <img className={IMG_CLASSNAME} src={backside} alt={'backside'} />,
}

const TideCard = ({ card, username, isPrimary, handleSelect = null}) => {
    const { cardName, cardOwner, cardIndex } = card
    const cardCompName = cardName || 'backside'

    const imgComp = TIDE_CARDS_DATA[cardCompName]

    const ownerClass = !cardOwner ? null : ((cardOwner === username) ? 'own' : 'others')

    //isPrimary --> higher priority card for this user (selected after this card -- >should only apply to swordholder)
    //isPrimary can be false/true/undefined --> i know...
    const priorityClass = (isPrimary || isPrimary === undefined) ? null : 'secundo'

    const prioText = isPrimary === true ? ' !' : null

    return (
        <div
            className={`tidecard ${ownerClass} ${priorityClass} card-borders`}
            onDoubleClick={() => handleSelect(cardIndex)}
        >
            {imgComp}
            {cardOwner}{prioText}
        </div>
    )
}


export default TideCard