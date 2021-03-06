const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err || !user ){
            return res.status(400).json({
                error: "user not found"
            })
        }
        req.profile = user // adds profile object in req with user info
        next();
    })
} 

exports.hasAuthorization = (req, res, next ) =>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized){
        return res.status(404).json({
            error: "User not Authorized to perform this action"
        })
    }
    next();
}

exports.allUsers = (req, res) =>{
    User.find((err, users)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(users)
    }).select("name email updated created")
    
}

exports.getUser = (req, res) =>{
    req.profile.hash_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
};

exports.updateUser = (req, res, next)=>{
    let user = req.profile
    user = _.extend(user, req.body) // extend - mutate 
    user.updated = Date.now()
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Your are not authorised to perform this action"
            })
        }
        user.hash_password = undefined;
        user.salt = undefined;
        console.log("test")
        res.json(user)
    })
    
}

exports.deleteUser = (req, res, next ) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
    user.hash_password = undefined;
    user.salt = undefined;
    res.json({
        message: "User deleted Successfully"
    })
    })
}