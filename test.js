const express = require('express')
const app = express()
const port = 69
const router = require('./router/test')

require('./database')

app.listen(port, () => {
    console.log("Listen to", port)
})

app.use(express.json())

app.use('/', router)

