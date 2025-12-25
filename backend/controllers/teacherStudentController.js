const Student = require("../models/studentModel");

// 👨‍🏫 Teacher sees students of assigned class
exports.getMyStudents = async (req, res) => {
    try {
        const teacher = req.user;
        console.log(teacher)

        const students = await Student.find({
            className: teacher.className,
            section: teacher.section,
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
