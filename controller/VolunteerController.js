const db = require('../database')
const multer = require('multer')
const randomstring = require('randomstring')
const diskStorage = multer.diskStorage({
    destination: './resource/volun/images',
    filename: function (req, file, cb) {
        const rng = randomstring.generate(8)
        const extension = file.mimetype.split('/')[1]
        cb(null, 'FotoSekolah-' + rng + `.${extension}`)
    }
})

const upload = multer({ diskStorage })

const sekolahVol = async (req, res, next) => {
    if (req.file) {
        console.log('Uploading file...')
        var filename = req.file.filename
        var uploadStatus = 'File Uploaded Succesfully'
    } else {
        console.log('No file uploaded')
        var filename = 'FILE NOT UPLOADED'
        var uploadStatus = 'File Upload Failed'
    }
    const sekol = req.body.sekolah
    const lokasi = req.body.lokasi
    const jumlah = req.body.jumlah
    const desc = req.body.desc

}