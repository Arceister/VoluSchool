require('dotenv').config()

const db = require('../database')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const jwt_key = process.env.jwt_key
const {
    createWorker
} = require('tesseract.js')
const multer = require('multer')
const randomstring = require('randomstring')
const diskStorage = multer.diskStorage({
    destination: './resource/images',
    filename: function (req, file, cb) {
        const rng = randomstring.generate(8)
        const extension = file.mimetype.split('/')[1]
        cb(null, 'Fotoktp-' + rng + `.${extension}`)
    }
})

const upload = multer({
    storage: diskStorage
})

const tesVerifikasi = async (req, res, next) => {
    if (req.file) {
        console.log('Uploading file...')
        var filename = req.file.filename
        var uploadStatus = 'File Uploaded Succesfully'
    } else {
        console.log('No file uploaded')
        var filename = 'FILE NOT UPLOADED'
        var uploadStatus = 'File Upload Failed'
    }
    const ktp = req.body.noktp
    const image = "resource/images/" + filename
    const worker = createWorker({
        logger: m => console.log(m)
    });

    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {
            data: {
                text
            }
        } = await worker.recognize(image);
        if (text.includes(ktp)) {
            await db.query('update user set ktp = ?, image = ? where id = 31', [ktp, image]) //685272368
                .then(() => {
                    res.json({
                        "success": "true",
                        "message": "berhasil upload",
                        status: uploadStatus,
                        filename: `Name Of File: ${filename}`
                    })
                }).catch((err) => {
                    console.log(err)
                    next(err)
                })
        } else {
            console.log(text)
        }
        await worker.terminate();
    })();
}

const getAllUser = async (req, res, next) => {
    try {
        const [rows] = await db.query('select * from user')
        res.json({
            "success": true,
            "data": rows
        })
    } catch (err) {
        next()
    }
}

const registerUser = async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const isEmail = validator.isEmail(email)
    if (isEmail) {
        const [rows] = await db.query('select * from user where email = ? limit 1', [email])
        if (rows.length == 0) {
            const password = req.body.password
            const confPassword = req.body.confirm
            const isPassword = validator.equals(confPassword, password)
            if (isPassword) {
                const hashedpassword = await bcrypt.hash(password, 11)
                db.query('insert into user(name, email, password, verif) values (?,?,?,1)', [name, email, hashedpassword])
                    .then(() => {
                        res.json({
                            "Success": true,
                            "Message": "Akun terdaftar"
                        })
                    })
                    .catch((err) => {
                        res.status(500)
                        res.json({
                            "Success": false,
                            "error": err
                        })
                    })
            } else {
                res.status(409)
                const error = new Error("Password Confirmation Incorrect")
                next(error)
            }
        } else {
            res.status(409)
            const error = new Error("Email already registered")
            next(error)
        }
    } else {
        res.status(409)
        const error = new Error("Email format incorrect")
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const email = req.body.email
    const [rows] = await db.query('select * from user where email = ?', [email])
    if (rows.length != 0) {
        const user = rows[0]
        const password = req.body.password
        bcrypt.compare(password, user.password)
            .then(async () => {
                const payload = {
                    "id_user": user.id,
                    "email": user.email
                }
                const token = await jwt.sign(payload, jwt_key)
                if (token) {
                    res.json({
                        "success": true,
                        "token": token
                    })
                } else {
                    const error = new Error("Wrong password")
                    next(error)
                }
            })
            .catch(() => {
                const error = new Error("Not registered")
                next(error)
            })
    }
}

const getUserById = async (req, res, next) => {
    const currid = req.user.id_user
    const id = req.params.id
    if (currid == id) {
        const [rows] = await db.query("select * from user where id = ?", [id])
        if (rows.length > 0) {
            res.json({
                "success": true,
                "user": rows[0]
            })
        } else {
            const error = new Error("User not Found")
            next(error)
        }
    } else {
        const [rows] = await db.query("select name, email from user where id = ?", [id])
        if (rows.length > 0) {
            res.json({
                "success": true,
                "user": rows[0]
            })
        } else {
            const error = new Error("User not Found")
            next(error)
        }
    }
}

const updateUserName = (req, res, next) => {
    const id = req.params.id
    const newName = req.body.name
    db.query('update user set name = ? where id = ?', [newName, id])
        .then(() => {
            res.json({
                "success": true,
                "message": "Change name success"
            })
        })
        .catch(() => {
            res.status(404)
            const error = new Error("User Not Found")
            next(error)
        })
}

const deleteUser = (req, res, next) => {
    const id = req.params.id
    db.query('delete from user where id = ?', [id])
        .then(() => {
            res.json({
                "success": true,
                "message": "delete success"
            })
        })
        .catch(() => {
            res.status(404)
            const error = new Error("User Not Found")
            next(error)
        })
}

const userController = {
    upload,
    tesVerifikasi,
    getAllUser,
    registerUser,
    loginUser,
    getUserById,
    updateUserName,
    deleteUser,
}

module.exports = userController