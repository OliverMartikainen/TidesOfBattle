require('dotenv').config()

const { MONGO_USER, MONGO_PASS, MONGO_ADDRESS, MONGO_DB_NAME } = process.env
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_ADDRESS}/${MONGO_DB_NAME}?retryWrites=true&w=majority`

const SSE_EMMITTER = 'TIDE_SSE'
console.log(MONGO_URI)
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
    MONGO_URI,
    SSE_EMMITTER,
    TOKEN_SECRET,
}
