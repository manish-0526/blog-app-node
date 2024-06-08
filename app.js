require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')

const { connectToMongodb } = require('./utils/connectDB')

const authRouter = require('./routers/authRouter')
const blogRouter = require('./routers/blogRouter')
const userRouter = require('./routers/userRouter')

const blogController = require('./controllers/blogController')

const logMiddleware = require('./middlewares/logger')
const { deserializeUser } = require('./middlewares/user')

const app = express()

app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

// setup view engine
app.set('view engine', 'ejs')

// setup static files
app.use(express.static('public'))

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

connectToMongodb();

// middlewares
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})

app.use(logMiddleware);
app.use(deserializeUser);

app.use('/', authRouter)
app.use('/blog', blogRouter)
app.use('/user', userRouter)

app.get('/', async (req, res) => {
    const blogs = await blogController.getBlogs(10)
    res.render('index', { blogs })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404')
});