const express = require('express');

// dotenv
const dotenv = require ('dotenv');
dotenv.config();

// swagger
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./src/app.routs');
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler');
const cookieParser = require('cookie-parser');

async function main(){
    const app = express();
    const port = process.env.PORT;
// خوندن بدنه بادی
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
// mongoose
require('./src/config/mongoose.config');
// swagger
app.use(mainRouter)
swaggerConfig(app);

// ارورها
NotFoundHandler(app);
AllExceptionHandler(app);


    app.listen(port,()=>{
        console.log("server connect");
    })
}

main();