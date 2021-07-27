const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();


exports.signup = async (req, res) =>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "email is taken"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message: "User Successfully Singup! Please Login"})
}

exports.signin = (req,res) =>{
    //Find user bases on email
    const {email, password} = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user){
            return res.status(401).json({
                message: "User with that email doesnt exits, Please signIn"
            })
        }
        //Create authenticate in user model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                message: "Email and password doesnt match"
            })
        }
    

    //Generate token with User Id and secret
    const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET);

    // Persist the tooken as t in cookie with expiry date
    res.cookie("t", token, {expire: new Date() + 9999 })

    //return with response with user and token to forontend client
    const { _id, name, email } = user;
    return res.json({token, user: {_id, email, name }})
})
}
