const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    category: String,
    tags: [String],
    noteDate: Date,
    dueDate: Date,
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    color: { type: String, default: '#6366f1' },
    isPinned: { type: Boolean, default: false },
    reminderDate: Date,
    link: String
}, { timestamps: true });

let noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;
