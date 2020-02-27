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
const cvStorage = multer.diskStorage({
    destination: './resource/volun/cv',
    filename: function (req, file, cb) {
        const rng = randomstring.generate(8)
        const extension = file.mimetype.split('/')[1]
        cb(null, 'FormCv-' + rng + `.${extension}`)
    }
})
const upload = multer({ storage: diskStorage })
const upCv = multer({ storage: cvStorage })
var terkumpul = 0

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
    const image = "/resource/volun/images/" + filename
    await db.query('insert into `sekolahvol`(sekolah,lokasi,jumlah,deskripsi,image,terkumpul) values(?,?,?,?,?,?)', [sekol,lokasi,jumlah,desc,image,terkumpul])
    .then(() => {
        res.json({
            "success": true,
            "messaage": "Sukses",
            status: uploadStatus,
            filename: `Name of file: ${filename}` 
        })
    })
    .catch((err) => {
        res.json({
            "success": false,
            "error": err
        })
    })
}

const volunRec = async (req,res,next) => {
    if (req.file) {
        console.log('Uploading file...')
        var filename = req.file.filename
        var uploadStatus = 'File Uploaded Succesfully'
    } else {
        console.log('No file uploaded')
        var filename = 'FILE NOT UPLOADED'
        var uploadStatus = 'File Upload Failed'
    }
    const sekolah = req.params.id 
    const nama = req.body.nama
    const ttl = req.body.ttl
    const pekerjaan = req.body.pekerjaan
    const image = "/resource/volun/cv/" + filename
    await db.query('insert into `volun`(id_sekolah, nama, ttl, pekerjaan, image) values(?,?,?,?,?)',[sekolah,nama,ttl,pekerjaan,image])
    .then(() => {
        res.json({
            "success": true,
            "message": `${nama} berhasil didaftarkan`,
            status: uploadStatus,
            filename: `Name of file: ${filename}`
        })
    })
}

const vokun = {
    upload,
    upCv,
    sekolahVol,
    volunRec
}

module.exports = vokun