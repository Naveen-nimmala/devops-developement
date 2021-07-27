const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
const { createHmac } = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date


});


userSchema.virtual('password')
.set(function(password){
    this._password = password; //create temp variable
    this.salt = uuidv1(); //generate timestamp
    this.hash_password = this.encryptPassword(password) //encryptPassword
})
.get(function(){
    return this._password
})


userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hash_password
    },
    encryptPassword: function(password){
        if(!password) return "";
        try {
            return createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        } catch (error) {
            return ""
        }
    }
}




module.exports = mongoose.model('User', userSchema)