const express = require('express')
const { protect, isAdmin, isTeacher } = require('../middleware/authMiddleware');
const { createTeacher, loginTeacher, getMyStudents } = require('../controllers/teacherController');

const router = express.Router();

// Admin creates Teacher 
router.post('/create', protect, isAdmin, createTeacher)


// Teacher login 
router.post('/login', loginTeacher)

// Teacher see students of own class 
router.get('/my-students', protect, isTeacher, getMyStudents)

module.exports = router