const userRouter = require('express').Router()
const users = require('../cache/users')
const { SSE_EMMITTER } = require('../utils/config')
const tokenManager = require('../utils/tokenManager')

//exempt from token
userRouter.get('/usernames', async (req, res) => {
    const allUsers = await users.getUsers()
    const usernames = allUsers.map(user => user.username)
    res.status(200).send(usernames)
})

userRouter.get('/stats', async (req, res) => {
    const allUsers = await users.getUsers()
    res.status(200).send(allUsers)
})

userRouter.post('/add', async (req, res) => {
    const username = req.body.username
    const isDone = await users.addUser(username)
    if (!isDone) {
        return res.status(400).send('User exists already')
    }
    return res.status(204).send()
})

userRouter.post('/changeSwordUser', async (req, res) => {
    // @ts-ignore - added to req in middleware
    const username = req.username //posters username

    const newSwordUser = req.body.newSwordUser

    await users.updateSwordUser(newSwordUser)

    res.app.emit(SSE_EMMITTER, { msg: 'sword-change', username: newSwordUser, doneBy: username })
    res.status(204).send()
})

//exempt from token
userRouter.post('/login', async (req, res) => {
    //atm this just gives a token used to limit random crawlers from accessing the other endpoints
    const username = req.body.username

    if (await users.isUserValid(username)) {
        const token = tokenManager.tokenGenerator(username)
        return res.status(200).send({ username, token })
    }

    return res.status(401).send('invalid username')
})

module.exports = userRouter