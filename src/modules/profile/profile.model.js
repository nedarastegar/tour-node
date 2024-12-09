const { Schema, model } = require("mongoose");

// otp code yebarmasraf for mobile
const OTPSchema = new Schema({
    code:{type:String, required:false, default: undefined},
    expiresIn: {type:Number, required:false, default: 0 },
    
})

// Profile model
const ProfileSchema = new Schema({
    fullName: { type: String, required: true },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
},{timestamps: true})


const ProfileModel = model('Profile', ProfileSchema);

module.exports = ProfileModel