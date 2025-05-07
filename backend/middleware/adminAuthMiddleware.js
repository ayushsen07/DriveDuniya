const {verifyToken} = require('../utills/jwt');
const adminModel = require('../models/adminModel')

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

    const admin = await adminModel.findById(decoded.id)
    // console.log('admin is ', admin);
    

    if(!admin){
        res.status(401).json({
            message:"Admin not found"
        })
    }

    req.admin = admin;
    next()
}