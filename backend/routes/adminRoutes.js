const express = require('express');
const { registerAdmin, loginAdmin, updateProfile, getAdminProfile, changePassword } = require('../controllers/adminController');
const { protect } = require('../middleware/adminAuthMiddleware');
const router = express.Router();

//middleWares




// admin auth
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

//profile route
router.put('/update-profile',protect, updateProfile)
router.get('/get-profile',protect, getAdminProfile)
router.put('/change-password', protect,changePassword)

module.exports= router