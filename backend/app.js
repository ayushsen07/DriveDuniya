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
const userRoutes = require('./routes/userRoutes')
const homeRoutes = require('./routes/homeRoutres')
const adminRoutes = require('./routes/adminRoutes')


// Routes declaration
app.use('/api/v1',homeRoutes)
// http://localhost:3000/api/v1
app.use('/api/v1/users', userRoutes)
// http://localhost:3000/api/v1/users/register
app.use('/api/v1/admin',adminRoutes)
// http://localhost:3000/api/v1/admin







module.exports= app



