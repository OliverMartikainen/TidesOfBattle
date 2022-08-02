import axios from 'axios'
import { getAuthHeader, setToken } from './tokenManager'
import config from 'utils/config'

const baseUrl = config.baseUrl
const SERVICE_URL = `${baseUrl}/users`

/**
 * 
 * @param {String} username 
 * @returns {Promise<String | null>}
 */
const login = async (username) => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.post(`${SERVICE_URL}/login`, { username: username }, authHeader)

        const { token } = res.data
        if (!token) {
            console.error(res)
            return null
        }
        
        setToken(token)
        return token
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * 
 * @returns {Promise<Array<String>>} usernames array
 */
const usernames = async () => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.get(`${SERVICE_URL}/usernames`, authHeader)
        return res.data || []
    } catch (error) {
        console.error(error)
        return ['FAILED TO GET USERNAMES - REFRESH PAGE']
    }
}

/**
 * 
 * @returns {Promise<Object>} just <div><pre> object --> this. 
 */
const stats = async () => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.get(`${SERVICE_URL}/stats`, authHeader)
        return res.data || []
    } catch (error) {
        console.error(error)
        return error
    }
}

/**
 * 
 * @param {String} username newSword user username 
 * @returns {Promise<Boolean>}
 */
const changeSwordUser = async (username) => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.post(`${SERVICE_URL}/changeSwordUser`, { newSwordUser: username }, authHeader)
        return (res.status === 204)
    } catch (error) {
        console.error(error)
        return false
    }
}

/**
 * 
 * @param {String} username 
 * @returns {Promise<Boolean>}
 */
const addUser = async (username) => {
    try {
        const authHeader = getAuthHeader()
        const res = await axios.post(`${SERVICE_URL}/add`, { username: username }, authHeader)
        return (res.status === 204)
    } catch (error) {
        console.error(error)
        return false
    }
}

export default {
    login,
    usernames,
    stats,
    changeSwordUser,
    addUser
}