import axios from 'axios'
import { getAuthHeader } from './tokenManager'
import config from 'utils/config'

const baseUrl = config.baseUrl
const SERVICE_URL = `${baseUrl}/cards`

/**
 * 
 * @param {Number} cardIndex 
 * @returns {Promise<Object | null>}
 */
const select = async (cardIndex) => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.post(`${SERVICE_URL}/select`, { cardIndex }, authHeader)

        const card = res.data?.card

        return card
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * 
 * @returns {Promise<Boolean>}
 */
const forceEnd = async () => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.get(`${SERVICE_URL}/forceEnd`, authHeader)
        return (res.status === 204)
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * @returns {Promise<Boolean>}
 */
const nosword = async () => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.get(`${SERVICE_URL}/nosword`, authHeader)
        return (res.status === 204)
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * 
 * @returns {Promise<{ swordOwner: String, ownCards: Array, othersCards: Array } | null >}
 */
const initialLoad = async () => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.get(`${SERVICE_URL}/initialLoad`, authHeader)
        const data = res.data
        const { ownCards, othersCards } = data.selectedCards
        return {
            swordOwner: data.swordOwner,
            ownCards: ownCards,
            othersCards: othersCards
        }

    } catch (error) {
        console.error(error)
        return null
    }
}

const cardsSSE = () => {
    try {
        const cardSub = new EventSource(`${SERVICE_URL}/sse`)
        return cardSub
    } catch (error) {
        console.error(error)
    }
}

export default {
    cardsSSE,
    forceEnd,
    nosword,
    select,
    initialLoad
}