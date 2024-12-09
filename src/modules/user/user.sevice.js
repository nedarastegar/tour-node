// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const UserModel = require('./user.model');
const autoBind = require('auto-bind');
const createHttpError = require('http-errors');


class UserService{
    // نمونه ای از مدل میسازیم
    #model;
    constructor(){
    autoBind(this);
    this.#model = UserModel;
    
    }

    }


    module.exports = new UserService();