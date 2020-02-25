const router = require('express').Router()
const userController = require('../controller/UserController')
const {checkToken} = require('../middleware')
//info: menghandle semua request dari /user
//get semua user
router.get('/', userController.getAllUser)

//get salah satu user
//kalo login id sama = keliatan semua, kalo engga = cuman nama sama email
router.get('/:id', checkToken, userController.getUserById)

//daftar user
router.post('/register', userController.registerUser)

//verif tes
router.post('/ver', userController.upload.single('myFile'), userController.tesVerifikasi)

//login
router.post('/login', userController.loginUser)

//updatesaldo
router.post('/saldo', userController.updateSaldo)

//update user
router.post('/:id', userController.updateUserName)

//delete user
router.delete('/:id', userController.deleteUser)

//verid


module.exports = router