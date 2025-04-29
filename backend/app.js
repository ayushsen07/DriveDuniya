const express = require('express')
const cors = require('cors')
const path= require('path')
const dotenv = require('dotenv');
const { execArgv } = require('process');

dotenv.config();


// will connect db later

const app = express()

// CORS configuration

app.use(cors({
    origin:['*'],
    methods : ['GET' , 'POST','PUT','DELETE','PATCH']
}) )

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname,'uploads')))


//routs

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`)
}) 