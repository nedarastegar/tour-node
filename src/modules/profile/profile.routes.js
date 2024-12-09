const {Router} = require('express');
const profileController = require('./profile.controller');
const Authorization = require('../../common/guard/authorization.guard');
const router = Router();


router.get("/profile", Authorization,profileController.whoami);


module.exports = {
    profileRouter: router
}