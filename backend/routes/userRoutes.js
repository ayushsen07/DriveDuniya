const express = require('express')
const router = express.Router();

const {registerUser , loginUser, changePassword, updateProfile } = require('../controllers/userController')
const {protect} = require('../middleware/userAuthMddleware')

// auth routes
router.post('/register',registerUser)
router.post('/login',loginUser)


// profile routes 
router.put('/update-profile',protect, updateProfile)
router.put('/change-password', protect, changePassword)



module.exports = router