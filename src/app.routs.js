const {Router} = require('express');
const {AuthRouter} = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/user/user.routes');
const { TourRouter } = require('./modules/tour/tour.routs');
const { BookingRouter } = require('./modules/booking/booking.routs');
const { profileRouter } = require('./modules/profile/profile.routes');
const mainRouter = Router();



mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);
mainRouter.use('/tour', TourRouter);
mainRouter.use('/booking', BookingRouter);
mainRouter.use('/profile', profileRouter);

module.exports = mainRouter;