const express = require('express');
const router = express.Router();
const {createPost, getPosts} = require('../controllers/post')

const validator = require('../validator')


router.get('/', getPosts);
router.post('/', validator.createPostValidator, createPost);

module.exports = router;