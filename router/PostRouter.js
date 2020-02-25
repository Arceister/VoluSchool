const router = require('express').Router()
const postController = require('../controller/PostController')
const { checkToken } = require('../middleware/')


//Get Post by id
router.get('/:id', postController.getPost)

//Post a Post
router.post('/', checkToken, postController.postPost)

//Update a Post by ID
router.put('/:id', postController.updatePost)

//Delete a post by ID
router.delete('/:id', postController.deletePost)

//Get all post
router.get('/', postController.getAllPost)

module.exports = router