// فقط اینجا اطلاعات رو میکشیم بیرون و به سرویس پاس میدیم
const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");
const autoBind = require('auto-bind');
const userService = require('./user.sevice');
const { UserMessage } = require('./user.messages');


class UserController{
    #service;
constructor(){
autoBind(this);
this.#service =userService;
}
async whoami(req,res,next){
try {
   
const user= req.user;
return res.json(user)

} catch (error) {
    next(error)
}
}



}


module.exports = new UserController();