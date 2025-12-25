const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false, },
    subject: { type: String },
    assignedClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    role: { type: String, default: 'teacher' }
}, { timestamps: true })

module.exports = mongoose.model('Teacher', teacherSchema)