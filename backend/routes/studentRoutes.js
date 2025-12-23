const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { createStudent, loginStudent, getStudentProfile } = require('../controllers/studentController');

const router = express.Router();

router.post('/create', protect, isAdmin, createStudent);
router.post('/login', loginStudent);
router.get('/profile', protect, getStudentProfile)


module.exports = router;