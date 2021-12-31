const User = require('../models/user')


const getUsers = async () => (await User.find()).map(user => user.toJSON())

const isUserValid = async (username) => !!(await User.findOne({ username: username }))

const isSwordUser = async (username) => !!(await User.findOne({ username: username, hasSword: true }))

/**
 * 
 * @param {String} username 
 * @param {Array<String>} selfCards 
 * @param {Array<String>} againstCards 
 */
const updateUserStats = async (username, selfCards, againstCards) => {
    const user = await User.findOne({ username: username })
    const userObj = user.toJSON()
    const stats = userObj.stats
    const { self, against } = stats

    selfCards.forEach(card => {
        self[card] = self[card] + 1
    })
    againstCards.forEach(card => {
        against[card] = against[card] + 1
    })

    await User.findOneAndUpdate({ username: username }, { stats: stats }, { new: true })
}

const updateSwordUser = async (username) => {
    await User.findOneAndUpdate({ hasSword: true }, { hasSword: false })
    await User.findOneAndUpdate({ username: username }, { hasSword: true })
}

const getSwordUser = async () => {
    const user = await User.findOne({ hasSword: true })
    const userObj = user.toJSON()
    return userObj.username
}

const addUser = async (username) => {
    if (await isUserValid(username)) return null

    const user = new User({
        username: username,
        hasSword: false,
        stats: {
            self: {
                zero: 0,
                zero_skull: 0,
                one_sword: 0,
                one_tower: 0,
                two: 0,
                three: 0
            },
            against: {
                zero: 0,
                zero_skull: 0,
                one_sword: 0,
                one_tower: 0,
                two: 0,
                three: 0
            }
        }
    })
    return await user.save()
}

const resetStatsForAll = async () => {
    const users = await getUsers()

    const updatePromises = users.map(user => {
        const { stats, username } = user
        const { self, against } = stats

        const selfNew = Object.keys(self).reduce((obj, name) => {
            obj[name] = 0
            return obj
        }, {})
        const againstNew = Object.keys(against).reduce((obj, name) => {
            obj[name] = 0
            return obj
        }, {})
        const statsNew = { self: selfNew, against: againstNew }

        const promise = User.findOneAndUpdate({ username: username }, { stats: statsNew }, { new: true })
        return promise
    })

    await Promise.all(updatePromises)
}

module.exports = {
    getUsers,
    isUserValid,
    isSwordUser,
    updateUserStats,
    updateSwordUser,
    addUser,
    getSwordUser,
    resetStatsForAll
}