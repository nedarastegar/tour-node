const express = require('express');

// dotenv
const dotenv = require ('dotenv');
dotenv.config();

// swagger
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./src/app.routs');

async function main(){
    const app = express();
    const port = process.env.PORT;
// mongoose
require('./src/config/mongoose.config');
// swagger
swaggerConfig(app);

app.use(mainRouter)

    app.listen(port,()=>{
        console.log("server connect");
    })
}

main();