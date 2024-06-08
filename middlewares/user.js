const { verifyToken } = require('../utils/jwt')

const deserializeUser = async (req, res, next) => {
    const token = req.cookies.token
    res.locals.user = undefined

    if (token) {
        try {
            const data = verifyToken(token)

            res.locals.user = data.user
        } catch (error) {
            console.log(error)
        }
    }
    next()
}

const requireUserHandler = (req, res, next) => {
    const { user } = res.locals

    if (user) {
        next()
        return;
    }

    res.redirect('/login')
}

module.exports = {
    deserializeUser,
    requireUserHandler
}