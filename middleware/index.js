require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwt_key = process.env.jwt_key
module.exports = {
    checkToken: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            if (token) {
                try {
                    const payload = await jwt.verify(token, jwt_key)
                    if (payload) {
                        req.user = payload
                        next()
                    } else {
                        res.status(403)
                        const err = new Error("Wrong Token")
                        next(err)
                    }
                } catch (err) {
                    res.status(500)
                    next(err)
                }
            }
        } else {
            res.status(403)
            const err = new Error("Login First")
            next(err)
        }
    }
}