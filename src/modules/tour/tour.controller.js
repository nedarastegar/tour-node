// فقط اینجا اطلاعات رو میکشیم بیرون و به سرویس پاس میدیم
const CookieNames = require('../../common/constant/cookie.enum');
const NodeEnv = require('../../common/constant/env.enum');
const autoBind = require('auto-bind');
const tourService = require('./tour.service');
const { TourMessage } = require('./tour.message');
const HttpCodes = require('http-codes');

class TourController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = tourService;
  }

  async create(req, res, next) {
    try {
      const {
        nameTour,
        origin,
        destination,
        departureDate,
        Returndate,
        price,
        Seatsavalable,
        Transportation,
      } = req.body;
      await this.#service.create({
        nameTour,
        origin,
        destination,
        departureDate,
        Returndate,
        price,
        Seatsavalable,
        Transportation,
      });
      return res.status(HttpCodes.CREATED).json({
        message: TourMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const tours = await this.#service.find();
      return res.json(tours);
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { origin, destination } = req.query;
      const tours = await this.#service.find({ origin, destination });
      return res.status(200).json(tours);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const {
        nameTour,
        origin,
        destination,
        departureDate,
        Returndate,
        price,
        Seatsavalable,
        Transportation,
      } = req.body;
      const { id } = req.params;
      await this.#service.update(id, {
        nameTour,
        origin,
        destination,
        departureDate,
        Returndate,
        price,
        Seatsavalable,
        Transportation,
      });
      return res.json({
        message: TourMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: TourMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TourController();
