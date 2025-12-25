const Teacher = require('../models/teacherModel')
const Student = require("../models/studentModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create Teacher (ADMIN ONLY)
exports.createTeacher = async (req, res) => {
    try {
        const { name, email, password, subject, assignedClass } = req.body;

        const teacherExist = await Teacher.findOne({ email });
        if (teacherExist) {
            return res.status(400).json({ message: "Teacher Already Exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const teacher = await Teacher.create({
            name, email, password: hashedPassword, subject, assignedClass
        })

        const teacherData = teacher.toObject();
        delete teacherData.password;

        res.status(201).json({
            message: "Teacher Created Successfully",
            data: teacherData
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// login Teacher 
exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        const teacher = await Teacher.findOne({ email }).select('+password')
        if (!teacher) {
            return res.status(400).json({ message: "Teacher Not found" })
        }

        const isMatch = await bcrypt.compare(password, teacher.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            {
                id: teacher._id,
                role: teacher.role,
                assignedClass: teacher.assignedClass
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        const teacherData = teacher.toObject();
        delete teacherData.password;

        res.status(200).json({
            message: "Teacher login successful",
            token,
            teacher: teacherData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMyStudents = async (req, res) => {
    try {
        const teacherClass = req.user.assignedClass;
        if (!teacherClass) {
            return res.status(400).json({ message: "No Class assigned to teacher" })
        }

        const students = await Student.find({ className: teacherClass }).select('-password')

        res.status(200).json({
            total: students.length,
            students
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}