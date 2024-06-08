const userModel = require('../models/userModel')

const getUser = async (id) => {
    const user = await userModel.findById(id, { password: 0 })

    return user
}

module.exports = {
    getUser
}