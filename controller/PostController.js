const db = require('../database')

const getPost = async (req, res, next) => {
    const id = req.params.id
    const [rows] = await db.query("select * from post where id = ?", [id])
    if (rows.length > 0) {
        res.json({
            "success" : true,
            "post" : rows[0]
        })
    }
    else {
        const error = new Error("Post not Found")
        next(error)
    }
}

const postPost = (req, res, next) => {
    const id_user = req.user.id_user
    const content = req.body.content
    db.query('insert into post(id_user, content) values(?,?)',
        [id_user, content])
        .then(() => {
            res.json({
                "success": true,
                "message": "post created"
            })
        })
        .catch((err) => {
            res.json({
                "success": false,
                "error": err,
            })
            console.log(err)
        })
}

const updatePost = (req, res, next) => {
    const id = req.params.id
    const newPost = req.body.content
    db.query('update post set content = ? where id = ?', [newPost, id])
    .then(() => {
        res.json({
            "success": true,
            "message": "Post Updated"
        })
    })
    .catch(() => {
        res.status(404)
        const error = new Error("User Not Found")
        next(error)
    })
}

const deletePost = (req, res, next) => {
    const id = req.params.id
    db.query('delete from post where id = ?', [id])
        .then(() => {
            res.json({
                "success": true,
                "message": "Content deleted."
            })
        })
        .catch(() => {
            res.status(404)
            const error = new Error("User Not Found")
            next(error)
        })
}

const getAllPost = async (req, res, next) => {
    try {
        const [rows] = await db.query('select * from post')
        res.json({
            "success": true,
            "data": rows
        })
    }
    catch (err){
        next(err)
    }
}

const postController = {
    getPost,
    postPost,
    updatePost,
    deletePost,
    getAllPost
}

module.exports = postController

