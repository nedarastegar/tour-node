
// connect to mongoose

const {default:mongoose} = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URL).then(()=>{
console.log("connect to db");

}).catch(err=>{
    console.log(err?.message ?? "failed db connection");
})