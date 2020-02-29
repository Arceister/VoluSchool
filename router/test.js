const router = require('express').Router()
const userRouter = require('./UserRouter')
const donasiRouter = require('./DonasiRouter')
const volunteerRouter = require('./VolunteerRouter')

router.get('/', (req,res) => {
    res.send('Bismillah BCC')
})

router.use('/user', userRouter)
router.use('/donasi', donasiRouter)
router.use('/volun', volunteerRouter)
router.use(notFound)
router.use(errorHandler)

function notFound(req, res, next) {
    res.status(404)
    const err = new Error("Page not found")
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500) 
    const message = err.message || "Internal server error"
    res.json({
        "message" : message
    })
}

module.exports = router