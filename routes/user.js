const express = require('express');
const router = express.Router();
const {userById, allUsers, getUser, updateUser, deleteUser, hasAuthorization} = require('../controllers/user')
const {requireSignin} = require('../controllers/auth')


router.get('/users', allUsers);

router.get("/user/:userId",requireSignin,  getUser)

router.put("/user/:userId" ,requireSignin, updateUser)

router.delete("/user/:userId" ,hasAuthorization, deleteUser)

router.param("userId", userById)



module.exports = router;