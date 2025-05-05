

const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const { createToken } = require('../utills/jwt')



//     USER REGISTER 
const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password, phone) are required."
        });
    }
    try {
        // check if user already exist
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exsits"
            })
        }

        //   if not than create a new user 
        const user = await userModel.create({
            name,
            email,
            password,
            phone,
            role: 'user'
        })

        res.status(201).json({
            success: true,
            message: "User Register successfully",
            token: createToken(user),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }

        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,

        })

    }
}



// LOGIN USER

const loginUser = async (req, res) => {
    console.log("login user is called");

    try {
        const { email, password } = req.body;
        console.log("email is", email);

        // Check for missing fields → return early
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Required field is missing: Email or Password is required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }

        if (user.status === 'Banned') {
            return res.status(403).json({
                success: false,
                message: 'Your account is banned, please contact admin/support'
            });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: createToken(user),
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while login"
        });
    }
};


const changePassword = async (req, res)=>{
 try {
    const {currentPassword, newPassword} = req.body;

    const user = await userModel.findById(req.user._id);
    if(!await user.matchPassword(currentPassword)){
       return exports.status(400).json({
        success:false,
        message:"current password is incorrect"
       })
    }


    // for updation of password
    user.password=newPassword;
    await user.sace()
    res.json({
        success:true,
        message:"Password is changed successfully"
    })

 } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
    
 }
}






module.exports = {
    registerUser,
    loginUser,
    changePassword
}
