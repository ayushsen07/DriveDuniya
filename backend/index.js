const dotenv = require('dotenv');
dotenv.config();

const app = require('./app')
const connectDB = require('./config/db')


connectDB()
.then(() =>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO db connection failed !!!" , err);
    
})
