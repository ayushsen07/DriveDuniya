const userModel = require('../models/userModel')
const {verifyToken} = require('../utills/jwt')

exports.protect = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message:"Authorization is missing"
        })
    }

    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message:"Token must be Bearer token"
        })
    }

    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message:"Token is not provided"
        })
    }

    //verify token

    const decoded = verifyToken(token);
    console.log("token is verified");
    
    if(!decoded){
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }

    const user = await userModel.findById(decoded.id)
    console.log('user is ', user);
    

    if(!user){
        res.status(401).json({
            message:"User not found"
        })
    }

    req.user = user;
    next()
}