const express = require('express');
const router = express.Router();
const {
    createPost, 
    getPosts, 
    postByUser, 
    postById, 
    isPoster,
    updatePost,
    deletePost
} = require('../controllers/post')
const {requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')

const {createPostValidator} = require('../validator')


router.get('/posts', getPosts);
router.get('/', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/post/by/:userId', postByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);



// Any route containing :userId, out app will excute userById first
router.param("userId", userById)

// Any route containing :postId, out app will excute userById first
router.param("postId", postById)

module.exports = router; 