const express = require('express');
const router = express.Router();
const postController = require('../controllers/post')

const validator = require('../validator')


router.get('/', postController.getPosts);
router.post('/', validator.createPostValidator, postController.createPost);

module.exports = router;