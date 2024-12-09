// فقط اینجا اطلاعات رو میکشیم بیرون و به سرویس پاس میدیم
const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");
const autoBind = require('auto-bind');
const profileService = require('./profile.sevice');
const { profileMessage } = require('./profile.messages');


class profileController{
    #service;
constructor(){
autoBind(this);
this.#service =profileService;
}
async whoami(req,res,next){
try {
   
const profile= req.profile;
return res.json(profile)

} catch (error) {
    next(error)
}
}



}


module.exports = new profileController();