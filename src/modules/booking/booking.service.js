// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const Bookingmodel = require('./booking.model');
const { BookingMessage } = require('./booking.message');
const Tourmodel = require('../tour/tour.model');
const UserModel = require('../user/user.model');



class BookingService{
    // نمونه ای از مدل میسازیم
    #model;
    constructor(){
    autoBind(this);
    this.#model = Bookingmodel;
    this.Tour = Tourmodel;
    this.User = UserModel;
    
    }


  

    async create(bookingDto) {
   const tour = await this.checkExistBytourId(bookingDto.tourId);
    const user= await this.checkExistByuserId(bookingDto.userId);
   await this.checkCapacity(bookingDto.capacity);
   console.log(bookingDto);
   bookingDto.tourId = tour._id;
   bookingDto.userId = user._id;
    booking = await this.#model.create(bookingDto);
     return await booking.save();

    }


    async find(){
        return await this.#model.find({}, {__v: 0})
        .populate('tour');
    }

    async checkExistBytourId(tourId) {
        // برای موجود بودن تور
    const tour = await this.Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'تور یافت نشد' });
    }
    }

    async checkExistByuserId(userId) {
    // بررسی یوزر
    const user = await this.User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'not found user' });
    }
    }


    async checkCapacity(bookingDto) {
       
        //  برای ظرفیت
    if (this.Tour.Seatsavalable - this.Tour.booked < bookingDto.capacity) {
        return res.status(400).json({ message: 'ظرفیت کافی برای رزرو وجود ندارد' });
      }
  
         // به‌روزرسانی تعداد رزروهای برای تور
         this.Tour.booked += bookingDto.capacity;
         await Tour.save();
         return res.status(201).json({ message: 'رزرو با موفقیت انجام شد'});
        }



}

    module.exports = new BookingService();