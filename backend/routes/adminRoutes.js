const express = require('express')
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
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

module.exports = router