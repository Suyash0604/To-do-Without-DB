const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title:String,
    content:String
});

let noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;
