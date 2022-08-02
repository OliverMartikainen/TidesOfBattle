const { tokenVerification } = require('./tokenManager')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substr(7)
    }
    next()
}

const EXEMPT_API_PATHS = ['/api/cards/sse', '/api/users/login', '/api/users/usernames']

/**
 * Validates requests token & checks if request url route requires token
 */
const requestTokenValidator = (request, response, next) => {
    const url = request.url

    //check if url is one that needs a token --> /api but not explicitly exempt
    if (url.includes('/api') && !EXEMPT_API_PATHS.includes(url)) {
        if(!request.token) {
            console.log(url)
            response.status(401).send({ error: 'token missing'})
            return
        }

        const { isVerified, username } = tokenVerification(request.token)
        if (!isVerified) {
            response.status(401).json({ error: 'token invalid' })
            return
        }
        request.username = username
    }

    next()
}



module.exports = {
    tokenExtractor,
    requestTokenValidator
}