const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * 👨‍🎓 ADMIN CREATES STUDENT
 * Auto Roll Number Logic (Class + Section wise)
 */
exports.createStudent = async (req, res) => {
    try {
        const { name, className, section, email, password } = req.body;

        const lastStudent = await Student.findOne({ className, section }).sort({ createdAt: -1 })

        let rollNumber;
        if (lastStudent) {
            const lastRoll = parseInt(lastStudent.rollNumber)
            rollNumber = (lastRoll + 1).toString()
        } else {
            rollNumber = "1"
        }

        // password hash 
        const hashedPassword = await bcrypt.hash(password, 10)

        const student = await Student.create({
            name, rollNumber, className, section, email, password: hashedPassword
        })

        const studentObj = student.toObject();
        delete studentObj.password;
        res.status(201).json({
            message: "Student created successfully",
            studentObj,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.loginStudent = async (req, res) => {
    try {
        const { rollNumber, password } = req.body;

        const student = await Student.findOne({ rollNumber }).select("+password")

        if (!student) {
            return res.status(400).json({ message: "Student not found" })
        }

        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Inavlid Credentials" })
        }

        const token = jwt.sign(
            { id: student._id, role: student.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        const studentObj = student.toObject();
        delete studentObj.password;
        res.status(200).json({
            message: "Login successful",
            token,
            studentObj,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// get Student Profile 
exports.getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        res.status(200).json(student, { message: "Student Profile Get Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
