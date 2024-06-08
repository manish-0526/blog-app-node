const logMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)

    if (Object.keys(req.body).length > 0) {
        console.log(req.body)
    }
    next();
}

module.exports = logMiddleware