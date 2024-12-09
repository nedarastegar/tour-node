// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const Bookingmodel = require('./booking.model');
const { BookingMessage } = require('./booking.message');
const Tourmodel = require('../tour/tour.model');
const UserModel = require('../user/user.model');

class BookingService {
  // نمونه ای از مدل میسازیم
  #model;
  #Tour;
  #User;
  constructor() {
    autoBind(this);
    this.#model = Bookingmodel;
    this.#Tour = Tourmodel;
    this.#User = UserModel;
  }

  async create(bookingDto) {
    const { tourId, userId } = bookingDto;

    await this.checkExistBytourId(tourId);
    await this.checkExistByuserId(userId);
    // const booking = await this.checkCapacity(bookingDto.capacity);
    // if (!booking) return { message: 'Failed to reserve' };

    bookingDto.tourId = tourId;
    bookingDto.userId = userId;
    const booking = await this.#model.create(bookingDto);

    return await booking.save();
  }

  async find(userId) {
    return await this.#model.find({ user: userId }, { __v: 0 }).populate('tour');
  }

  async checkExistBytourId(tourId) {
    // برای موجود بودن تور
    const tour = await this.#Tour.findById(tourId);
    if (!tour) {
      // return res.status(404).json({ message: 'تور یافت نشد' });
    }
    return tour;
  }

  async checkExistByuserId(userId) {
    // بررسی یوزر
    const user = await this.#User.findById(userId);

    if (!user) {
      // return res.status(404).json({ message: 'not found user' });
    }
  }

  async checkCapacity(bookingDto) {
    const tour = await this.checkExistBytourId(bookingDto.tourId);
    //  برای ظرفیت
    if (tour.Seatsavalable - tour.booked < bookingDto.capacity) {
      return { message: 'ظرفیت کافی برای رزرو وجود ندارد' };
    }

    // به‌روزرسانی تعداد رزروهای برای تور
    tour.booked += bookingDto.capacity;
    await this.#Tour.save();
    return true;
  }
}

module.exports = new BookingService();
