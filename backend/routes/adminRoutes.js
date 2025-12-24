const express = require('express')
const { registerAdmin, loginAdmin, getAllStudents } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { createClass } = require('../controllers/classController');
const { createSubject } = require('../controllers/subjectController');
const { assignSubjectToClass } = require('../controllers/classSubjectController');
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

// admin create class 
router.post('/class', protect, isAdmin, createClass)
// admin create subject 
router.post('/subject', protect, isAdmin, createSubject)
// admin assign subject to class 
router.post('/assign-subject', protect, isAdmin, assignSubjectToClass)

module.exports = router