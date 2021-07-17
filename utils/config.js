require('dotenv').config()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_ADDRESS = process.env.MONGO_ADDRESS


module.exports = {
    MONGO_USER,
    MONGO_PASS,
    MONGO_ADDRESS
}