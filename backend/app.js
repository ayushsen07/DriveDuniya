const express = require('express')
const cors = require('cors')
const path= require('path')


const app = express()


// some important middlewares 
app.use(express.json())
app.use(cors({
    origin:['*'],
    methods : ['GET' , 'POST','PUT','DELETE','PATCH']
}) )
app.use('/uploads', express.static(path.join(__dirname,'uploads')))



// Routes import
const userRouter = require('./routes/userRoutes')
const homeRouter = require('./routes/homeRoutres')



// Routes declaration
app.use('/api/v1/users', userRouter)
// http://localhost:3000/api/v1/users/register
app.use('/api/v1',homeRouter)
    







module.exports= app



