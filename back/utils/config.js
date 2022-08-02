require('dotenv').config()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_ADDRESS = process.env.MONGO_ADDRESS
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_ADDRESS}`

const SSE_EMMITTER = 'TIDE_SSE'

const TOKEN_SECRET=process.env.TOKEN_SECRET

module.exports = {
    MONGO_URI,
    SSE_EMMITTER,
    TOKEN_SECRET
}