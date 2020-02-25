const router = require('express').Router()
const donasiController = require('../controller/DonasiController')

//Mendaftarkan Sekolah
router.post('/sekoldon',donasiController.upload.single('myFile') ,donasiController.uangSekolah)

router.post('/dona', donasiController.donasiUang)

module.exports = router