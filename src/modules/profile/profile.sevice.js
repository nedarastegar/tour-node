// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const ProfileModel = require('./profile.model');
const autoBind = require('auto-bind');
const createHttpError = require('http-errors');


class ProfileService{
    // نمونه ای از مدل میسازیم
    #model;
    constructor(){
    autoBind(this);
    this.#model = ProfileModel;
    
    }

    }


    module.exports = new ProfileService();