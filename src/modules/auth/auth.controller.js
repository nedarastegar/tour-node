// فقط اینجا اطلاعات رو میکشیم بیرون و به سرویس پاس میدیم
const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");
const autoBind = require('auto-bind');
const authService = require('./auth.sevice');
const { AuthMessage } = require('./auth.messages');


class AuthController{
    #service;
constructor(){
autoBind(this);
this.#service =authService;
}
// ارسال کد یک بار مصرف
async sendOTP(req,res,next){
try {
    // اینجا موبایل رو از ورودی میگیره
// و برای اینکه بدونیم همچین موبایلی وجود داره یا نه توی سرویس چک میکنیم
    const{mobile} = req.body;
    
     await this.#service.sendOTP(mobile);
    return res.json({
        message:AuthMessage.SendOTPSuccessfully
    }) ;

} catch (error) {
    next(error)
}
}


// کد وارد شده از سمت یوزر کد درستی هست یا نه
// و اگه کد درست بود ایا یوزر قبلا اکانت داشته یا نه
async checkOTP(req,res,next){
    try {
        // اینجا موبایل رو از ورودی میگیره
// و برای اینکه بدونیم همچین موبایلی وجود داره یا نه توی سرویس چک میکنیم
const {mobile, code} = req.body;
const token = await this.#service.checkOTP(mobile, code);
// بررسی کوکی
return res.cookie(CookieNames.AccessToken, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === NodeEnv.Production 
}).status(200).json({
    message: AuthMessage.LoginSuccessfully,
});
    } catch (error) {
        next(error)
    }
    }
// برای خارج شدن از سیستم
async logout(req, res, next) {
    try {
        return res.clearCookie(CookieNames.AccessToken).status(200).json({
            message: AuthMessage.LogoutSuccessfully
        })
    } catch (error) {
        next(error)
    }

        }

}


module.exports = new AuthController();