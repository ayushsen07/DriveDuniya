const mongoose = require('mongoose')
// import { DB_NAME } from "../constants.js";




const connectDB = async ()=>{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)
      console.log(`\n MongoDB connected !! DB HOST: ${process.env.MONGODB_URI}`);
        
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
        
    }
}

module.exports = connectDB