// فقط اینجا اطلاعات رو میکشیم بیرون و به سرویس پاس میدیم
const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");
const autoBind = require('auto-bind');
const BookingService = require("./booking.service");
const {BookingMessage } = require("./booking.message");
const HttpCodes = require("http-codes")

class BookingController{
    #service;
constructor(){
autoBind(this);
this.#service =BookingService;
}


async reserve(req,res,next){
       
  try {
    const { tourId } = req.params;
    const userId = req.user._id;
    const {capacity } = req.body;
    await this.#service.create({userId,tourId ,capacity })
    return res.status(HttpCodes.CREATED).json({
        message: BookingMessage.Created
    })
  

  } catch (error) {
    next(error)
  }

  }

  async find(req, res, next) {
    try {
        const books = await this.#service.find()
        return res.json(books)
    }
    
    catch (error) {
        next(error)
    }
}
}


module.exports = new BookingController();