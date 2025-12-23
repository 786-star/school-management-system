const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    className: { type: String, required: true },
    section: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'student' }
}, { timestamps: true })

// 👇 compound index
studentSchema.index(
    { className: 1, section: 1, rollNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model("Student", studentSchema)