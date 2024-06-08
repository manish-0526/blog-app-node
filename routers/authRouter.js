const express = require('express')
const authController = require('../controllers/authController')

const authRouter = express.Router()

authRouter.get('/signup', (req, res) => {
    res.render('signupPage', { data: {} })
})
authRouter.post('/signup', async (req, res) => {
    const { fname, lname, email, password } = req.body

    const data = await authController.signup(fname, lname, email, password)

    if (data.token) {
        res.redirect('/login')
    }
    else {
        res.render('signupPage', { data })
    }
})

authRouter.get('/login', async (req, res) => {
    res.render('loginPage', { data: {} })
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const data = await authController.login(email, password)

    if (data.token) {
        res.cookie('token', data.token)
        res.redirect('/blog/compose')
    }
    else {
        res.render('loginPage', { data })
    }
})

module.exports = authRouter