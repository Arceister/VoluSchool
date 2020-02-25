const db = require('../database')
const multer = require('multer')
const randomstring = require('randomstring')
const diskStorage = multer.diskStorage({
    destination: './resource/formcv',
    filename: function (req, file, cb) {
        const rng = randomstring.generate(8)
        const extension = file.mimetype.split('/')[1]
        cb(null, 'Fotosekolah-' + rng + `.${extension}`)
    }
})

const upload = multer({ diskStorage })

const sekolahVol = async (req, res, next) => {
    
}