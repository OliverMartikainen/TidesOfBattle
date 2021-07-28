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

    selfCards.forEach(card => userObj.stats.self[card]++)
    againstCards.forEach(card => userObj.stats.against[card]++)
    User.findOneAndUpdate({ username: username }, userObj)
}

const updateSwordUser = async (username) => {
    await User.findOneAndUpdate({ hasSword: true }, { hasSword: false })
    await User.findOneAndUpdate({ username: username }, { hasSword: true })
}

const addUser = async (username) => {
    if(await isUserValid(username)) return null

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

module.exports = {
    getUsers,
    isUserValid,
    isSwordUser,
    updateUserStats,
    updateSwordUser,
    addUser
}