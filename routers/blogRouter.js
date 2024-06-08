const express = require('express')
const blogController = require('../controllers/blogController')
const { requireUserHandler } = require('../middlewares/user')

const blogRouter = express.Router()

blogRouter.get('/all', async (req, res) => {
    const blogs = await blogController.getBlogs()
    res.render('blogListPage', { blogs })
})

blogRouter.get('/compose',
    requireUserHandler,
    (req, res) => {
        res.render('composePage', { edit: false, blog: undefined })
    }
)

blogRouter.post('/compose',
    requireUserHandler,
    async (req, res) => {
        const { title, summery, body } = req.body
        await blogController.saveBlog(title, summery, 0, body, res.locals.user);

        res.redirect('/')
    }
)

blogRouter.post('/delete/:id', async (req, res) => {
    const id = req.params.id
    await blogController.deleteBlog(id)

    res.redirect('/')
})

blogRouter.get('/edit/:id',
    requireUserHandler,
    async (req, res) => {
        const { user } = res.locals
        const { id } = req.params

        const blog = await blogController.getBlog(id)

        if (blog.creator._id == user._id) {
            res.render('composePage', { edit: true, blog: blog })
            return
        }

        res.redirect('/login')
    }
)

blogRouter.post('/edit/:id',
    requireUserHandler,
    async (req, res) => {
        const { user } = res.locals
        const { id } = req.params
        const { title, summery, body } = req.body

        const blog = await blogController.getBlog(id)

        if (blog.creator._id == user._id) {
            await blogController.updateBlog(id, title, summery, blog.readCount, body, user)
            res.redirect('/')
            return
        }

        res.redirect('/login')
    }
)

blogRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const blog = await blogController.getBlog(id)
    await blogController.increaseBlogReadCount(blog)

    res.render('blogPage', { blog })
})


module.exports = blogRouter