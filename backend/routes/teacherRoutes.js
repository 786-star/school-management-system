const express = require('express')
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { createTeacher, loginTeacher } = require('../controllers/teacherController');

const router = express.Router();

// Admin creates Teacher 
router.post('/create', protect, isAdmin, createTeacher)


// Teacher login 
router.post('/login', loginTeacher)

module.exports = router