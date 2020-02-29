const router = require('express').Router()
const volunteerController = require('../controller/VolunteerController')
const {checkToken} = require('../middleware')

router.post('/daftar',volunteerController.upload.single('myFile'), volunteerController.sekolahVol)

router.post('/daftarvolun/:id',checkToken, volunteerController.upCv.single('cvUp'), volunteerController.volunRec)

module.exports = router