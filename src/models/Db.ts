import mongoose from "mongoose";

require('dotenv').config();

const mongoKey = process.env.MONGODB_URI

mongoose.connect(`${mongoKey}`).then(()=>{
    console.log("DP is up")
})