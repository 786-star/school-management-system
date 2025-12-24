const ClassSubject = require("../models/classSubjectModel");

exports.assignSubjectToClass = async (req, res) => {
    try {
        const { classId, subjectId } = req.body;

        const alreadyAssigned = await ClassSubject.findOne({ classId, subjectId });
        if (alreadyAssigned) {
            return res.status(400).json({ message: "Subject already assigned to class" })
        }

        const mapping = await ClassSubject.create({ classId, subjectId })
        res.status(201).json({
            message: "Subject Assigned to Class",
            data: mapping
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}