const router = require('express').Router()
const donasiController = require('../controller/DonasiController')
const {checkToken} = require('../middleware')

//Mendaftarkan Sekolah
router.post('/sekoldon',donasiController.upload.single('myFile') ,donasiController.uangSekolah)

router.post('/dona/:id',checkToken, donasiController.donasiUang)

module.exports = router