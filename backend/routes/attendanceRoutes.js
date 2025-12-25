const express = require('express');
const { markAttendance, getClassAttendance, getMyAttendance } = require('../controllers/attendanceController');
const { protect, isTeacher, isStudent } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/mark', protect, isTeacher, markAttendance);
router.get('/class/:classId', protect, isTeacher, getClassAttendance)
router.get('/my', protect, isStudent, getMyAttendance)

module.exports = router;