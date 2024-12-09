const { Router } = require("express");
const tourContrller = require("./tour.controller");
const Authorization = require('../../common/guard/authorization.guard');

const router = Router();
router.post("/create",Authorization,tourContrller.create)
router.get("/find", tourContrller.find)
router.delete("/:id", tourContrller.remove)
router.put("/:id", tourContrller.update)
router.post("/search", tourContrller.search)

module.exports = {
    TourRouter: router
}