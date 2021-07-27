const express = require('express');
const router = express.Router();
const {createPost, getPosts} = require('../controllers/post')

const {createPostValidator} = require('../validator')


router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router;