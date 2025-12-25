const Attendance = require("../models/attendanceModel");

exports.markAttendance = async (req, res) => {
    try {
        const teacher = req.user;
        const { date, attendance } = req.body;

        // 🔐 classId token se
        const classId = teacher.assignedClass;

        if (!classId) {
            return res.status(403).json({
                message: "No Class assigned to teacher"
            });
        }
        const records = [];

        for (let item of attendance) {
            const alreadyMarked  = await Attendance.findOne({
                studentId: item.studentId,
                date
            })

            if (alreadyMarked) continue;

            records.push({
                studentId: item.studentId,
                classId,
                date,
                status: item.status,
                markedBy: teacher.id,
            })
        }

        if (!records.length) {
            return res.status(400).json({ message: "Attendance Already marked" })
        }

        await Attendance.insertMany(records)

        res.status(201).json({
            message: "Attendance marked successfully",
            total: records.length
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getClassAttendance = async (req, res) => {
    try {
        const teacher = req.user;
        const { classId } = req.params;
        const { date } = req.query;

        if (teacher.assignedClass.toString() !== classId) {
            return res.status(403).json({ message: "Access denied" });
        }

        const filter = { classId };
        if (date) filter.date = date;

        const data = await Attendance.find(filter).populate('studentId', 'name rollNumber').sort({ date: 1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMyAttendance = async (req, res) => {
    try {
        const student = req.user;
        const data = await Attendance.find({
            studentId: student._id,
        }).sort({ date: 1 })

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}