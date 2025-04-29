

const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const createToken=require('../utills/jwt')


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
                Success: false,
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
            Success: true,
            token:createToken(user)

        })

    } catch (error) {

    }
}
