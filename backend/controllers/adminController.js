const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check admin already exist 
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        // hashPassword 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        })

        const adminData = admin.toObject();
        delete adminData.password;

        res.status(201).json({
            message: "Admin registered successfully",
            data: adminData
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // 🔒 Remove password before sending response
        const adminData = admin.toObject();
        delete adminData.password;

        res.status(200).json({
            message: "Login Successfull",
            token,
            data: adminData
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// get All Students 
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-password')

        res.status(200).json({
            total: students.length,
            students
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}