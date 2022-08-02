const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('./config')

/**
 * @param {*} token
 * @return {{isVerified: Boolean, username: String}} 
 */
const tokenVerification = (token) => {
    const failedCheck = { isVerified: false, username: null }

    if (!token) return failedCheck
    
    try {
        const tokenData = jwt.verify(token, TOKEN_SECRET)
        if(!tokenData) return failedCheck

        return { isVerified: true, username: tokenData + '' }
    } catch (error) {
        return failedCheck
    }
}

/**
 * Creates and returns verifiable jsonwebtoken string
 * @param {{ username: String, creationTime: Number }} tokenData 
 * @returns {String}
 */
const tokenGenerator = (tokenData) => jwt.sign(tokenData, TOKEN_SECRET)


module.exports = {
    tokenVerification,
    tokenGenerator
}