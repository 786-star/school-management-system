const mongoose = require('mongoose')

const classSubjectSchema = new mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }
}, { timestamps: true })

module.exports = mongoose.model('ClassSubject', classSubjectSchema)