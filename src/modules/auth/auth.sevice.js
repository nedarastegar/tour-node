// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const UserModel = require('../user/user.model');
const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { AuthMessage } = require('./auth.messages');
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');

class AuthService {
  // نمونه ای از مدل میسازیم
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  // ارسال کد یک بار مصرف
  async sendOTP(mobile) {
    //    مدلمون رو صدا میسازیم که برامون چک کنه که ایا وجود داره یا نه
    const user = await this.#model.findOne({ mobile });

    // اینجا این ابجکت رو میسازیم
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 2,
    };
    
    // اگه یوزر وجود نداشت بیاد و یوزر جدید بسازد
    if (!user) {
        const newUser = await this.#model.create({ mobile, otp });
        console.log(newUser);
      return newUser;
    }

    // اینجا یعنی یوزر وجو داره و سیو و آپدیت میشه
    //  وقتی به اینجا رسیده یعنی یوزر وجود داره وگرنه پاس میشد به ارورها
    //  حالا باید چک کنیم otp
    //  وجود داره یا نه

    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeNotexpired);
    }

    // اگه اکسپایر شده بود otp
    // جدید براش میسازه
    user.otp = otp;
    await user.save();
    return user;
  }

  // کد وارد شده از سمت یوزر کد درستی هست یا نه
  // و اگه کد درست بود ایا یوزر قبلا اکانت داشته یا نه
  async checkOTP(mobile, code) {
    // چک میشه ایا یوزر وجود داره یا نه
    const user = await this.checkExistByMobile({ mobile });
    const now = new Date().getTime();
    // چک میشه ایا کد معتبر هست یا نه
    if (user?.otp?.expiresIn < now)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);
    if (user?.otp?.code !== code)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
    }
    // ایجاد کردن توکن
    const accessToken = this.signToken({ mobile, id: user._id });
    user.accessToken = accessToken;
    // سیو کردن توکن و وریفای موبایل
    await user.save();
    return accessToken;
  }
  // برای خارج شدن از سیستم

  // برای ارسال ارورها از پکیج http-errors استفاده میکنیم
  // متدی ایجاد میکنیم برای چک کردن یوزر و از اون در موارد بالا استفاده میکنیم به راحتی

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne(mobile);
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
  // ایجاد توکن احراز هویت با jsonwebtoken

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1y' });
  }
}

// اینجا یه نمونه از کلاسمون به صورت سینگلتون میسازیم یعنی فقط یبار از این کلاس ساخته میشه
// و جاهای دیگه میشه ازش استفاده کرد
module.exports = new AuthService();
