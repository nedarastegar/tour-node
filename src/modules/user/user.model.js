const { Schema, model,Types } = require("mongoose");

// otp code yebarmasraf for mobile
const OTPSchema = new Schema({
    code:{type:String, required:false, default: undefined},
    expiresIn: {type:Number, required:false, default: 0 },
    
})

// user model
const UserSchema = new Schema({
    fullName:{type:String, required:false},
    role:{type:String, required:false},
    mobile: {type:String, required:true, unique: true },
    otp: {type:OTPSchema},
    verifiedMobile:{type: Boolean, required:true, default: false },
    accessToken: {type: String},
    profile:{type: Types.ObjectId,  ref: 'Profile',required: true, },
},{timestamps: true})

const UserModel = model('user', UserSchema);

module.exports = UserModel