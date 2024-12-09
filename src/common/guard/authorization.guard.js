const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();
const Authorization = async (req, res, next) => {
    try {
        // میخوایم احرازهویت کنیم توکن هارو
        const token = req?.cookies?.access_token;
        if (!token) throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
        // verify token
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // یا یوزر وجود داره یا نه ایا ای دی داخل دیتا وجود داره یا نه
        if (typeof data === "object" && "id" in data) {
            // و حذغ متدهای اضافی لین برای پرفرمنس بهتره 
            const user = await UserModel.findById(data.id, {accessToken: 0, otp: 0, __v: 0, updatedAt: 0, verifiedMobile: 0}).lean();
            if (!user) throw new createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
            req.user = user;
            // میدلور رو پاس میدیم به ادامه کار
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
    } catch (error) {
        next(error);
    }
};
module.exports = Authorization;