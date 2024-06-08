const express = require('express')
const userController = require('../controllers/userController')
const blogController = require('../controllers/blogController')
const { requireUserHandler } = require('../middlewares/user')

const userRouter = express.Router()

userRouter.get('/',
    requireUserHandler,
    async (req, res) => {
        const { user } = res.locals
        const blogs = await blogController.getBlogsByCreator(user._id)

        res.render('userPage', { writer: user, blogs: blogs })
    }
)

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const writer = await userController.getUser(id)
    const blogs = await blogController.getBlogsByCreator(id)
    res.render('userPage', { writer: writer, blogs: blogs })
})

module.exports = userRouter