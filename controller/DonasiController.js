const db = require('../database')
const multer = require('multer')
const randomstring = require('randomstring')
const diskStorage = multer.diskStorage({
    destination: './resource/images',
    filename: function (req, file, cb) {
        const rng = randomstring.generate(8)
        const extension = file.mimetype.split('/')[1]
        cb(null, 'Fotosekolah-' + rng + `.${extension}`)
    }
})

const upload = multer({
    storage: diskStorage
})
var namae
var terkumpul = 0

const uangSekolah = async (req, res, next) => {
    if (req.file) {
        console.log('Uploading file...')
        var filename = req.file.filename
        var uploadStatus = 'File Uploaded Succesfully'
    } else {
        console.log('No file uploaded')
        var filename = 'FILE NOT UPLOADED'
        var uploadStatus = 'File Upload Failed'
    }
    const sekolah = req.body.sekolah;
    const butuh = req.body.butuh;
    const image = "resource/images/" + filename;
    const deskripsi = req.body.deskripsi;
    await db.query('insert into `sekolahuang`(sekolah, butuh, terkumpul, image, deskripsi) values(?,?,?,?,?)', [sekolah, butuh, terkumpul, image, deskripsi])
        .then(() => {
            res.json({
                "success": true,
                "message": "berhasil memasukkan sekolah",
                status: uploadStatus,
                filename: `Name Of File: ${filename}`
            })
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err
            })
            console.log(err)
        })
}

const donasiUang = (req, res, next) => {
    const idusr = req.user.id_user
    const idsch = req.params.id
    const donasi = req.body.nominal
    const metode = req.body.metode
    const anonim = req.body.anonim
    if (anonim === true) {
        namae = "Anonim"
    } else if (anonim === false) {
        db.query('select name from `user` where id = ?',[idusr], (err, result, fields) => {
            namae = result[0].name
        })
    }
    db.query('update sekolahuang set terkumpul = terkumpul + ?', [donasi])
        .then(() => {
            db.query('insert into `history`(id_user,id_sekolah,nominal,metode,penyumbang) values(?,?,?,?,?)', [idusr, idsch, donasi, metode, namae])
            res.json({
                "success": true,
                "message": "Anjay kedaftar dong"
            })
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err
            })
        })
}



const don = {
    upload,
    uangSekolah,
    donasiUang
}

module.exports = don