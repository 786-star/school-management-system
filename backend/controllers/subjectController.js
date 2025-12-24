const Subject = require("../models/subjectModel");

exports.createSubject = async (req, res) => {
    try {
        const { name } = req.body;

        const subject = await Subject.create({ name })
        res.status(201).json({
            message: "Subject Created Successfully",
            data: subject
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}