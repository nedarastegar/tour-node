const { Router } = require("express");
const BookingContrller = require("./booking.contrller");
const Authorization = require('../../common/guard/authorization.guard');

const router = Router();
router.post("/book/:tourId", Authorization, BookingContrller.reserve)
router.get("/find",BookingContrller.find)


module.exports = {
    BookingRouter: router
}