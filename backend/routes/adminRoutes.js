const express = require('express')
const { registerAdmin, loginAdmin, getAllStudents } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

// protected test route 
router.get('/profile', protect, isAdmin, (req, res) => {
    res.json({
        message: "Welcome Admin",
        user: req.user
    })
})

// admin see all students 
router.get('/all-students', protect, isAdmin, getAllStudents)

module.exports = router