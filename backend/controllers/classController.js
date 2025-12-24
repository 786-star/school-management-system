const Class = require('../models/classModel')

exports.createClass = async (req, res) => {
    try {
        const { className, section } = req.body;

        const exists = await Class.findOne({ className, section })
        if (exists) {
            return res.status(400).json({ message: "Class Already Exists" })
        }

        const newClass = await Class.create({ className, section })
        res.status(201).json({
            message: "Class Created Successfully",
            data: newClass
        })
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}