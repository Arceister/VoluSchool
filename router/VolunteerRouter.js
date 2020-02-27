const router = require('express').Router()
const volunteerController = require('../controller/VolunteerController')

router.post('/daftar',volunteerController.upload.single('myFile'), volunteerController.sekolahVol)

router.post('/daftarvolun/:id',volunteerController.upCv.single('cvUp'), volunteerController.volunRec)

module.exports = router