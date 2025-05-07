const adminModel = require('../models/adminModel')
const createToken = require("../utills/jwt")



//ADMIN REGISTRATION

const registerAdmin = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password, phone) are required."
        });
    }
    try {
        //check if admin already exist
        const adminExists = await adminModel.findOne({ email })
        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: "Admin already exsits"
            })
        }

        //   if not than create a new user 
        const admin = await adminModel.create({
            name,
            email,
            password,
            phone,
            role: 'admin'
        })

        res.status(201).json({
            success: true,
            message: "Admin Registeration successfully",
            token: createToken(admin),
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
            }

        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,

        })

    }
}


// LOGIN ADMIN

const loginAdmin = async (req, res) => {
    // console.log("login user is called");

    try {
        const { email, password } = req.body;
        // console.log("email is", email);

        // Check for missing fields → return early
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Required field is missing: Email or Password is required"
            });
        }

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'admin does not exist'
            });
        }

        // if (user.status === 'Banned') {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Your account is banned, please contact admin/support'
        //     });
        // }

        const isPasswordMatch = await admin.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin logged in successfully",
            token: createToken(user),
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone
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



const getAdminProfile = async (req, res) => {

    try {
        const admin = await adminModel.findById(req.admin._id).select('-Password')

        res.status(202).json({
            success: true,
            data: {
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: 'admin',
                lastLogin: admin.lastLogin,
                joinedAt: admin.createdAt
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        // console.log("update profile is called");


        const exsistingAdmin = await adminModel.findOne({ email, _id: { $ne: req.admin._id } })

        if (exsistingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Email alread in use'
            })
        }

        const admin = await adminModel.findByIdAndUpdate(
            req.user._id,
            { name, email, phone },
            { new: true }
        ).select('-password');

        // console.log("updated admin is", admin);


        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    phone: admin.phone,
                    role: "admin",
                    lastLogin: admin.lastLogin,
                    joinedDate: admin.createdAt
                }
            }

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}



const changePassword = async (req, res) => {
    try {
        const { currentPasword, newPassword } = req.body;
        const admin = await adminModel.findById(req.admin._id);

        const isPasswordMatch = await admin.matchPassword(currentPasword)

        if (!isPasswordMatch) {
            res.status(404).json({
                success: false,
                message: "current password is incorrect"
            })
        }

        // update password
        admin.password = newPassword;
        await admin.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        res.status(500).
            json({
                success: false,
                message: error.message
            })
    }
}


module.exports={
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateProfile,
    changePassword
}