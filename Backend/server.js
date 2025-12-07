const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/db/db");
const app = express();
require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL;
const noteModel = require("./src/models/note.model");

connectToDB();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173',CLIENT_URL],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldd");
});

app.post("/create", async (req, res) => {
  try {
    let { title, content, priority, category, tags, noteDate, dueDate, status, color, isPinned, reminderDate, link } = req.body;
    const newNote = await noteModel.create({
      title: title,
      content: content,
      priority: priority || 'medium',
      category: category || '',
      tags: tags || [],
      noteDate: noteDate ? new Date(noteDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      status: status || 'pending',
      color: color || '#6366f1',
      isPinned: isPinned || false,
      reminderDate: reminderDate ? new Date(reminderDate) : null,
      link: link || ''
    });
    res.json({
      message: "Note created successfully",
      note: newNote
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message
    });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};
    
    if (date) {
      // Filter by noteDate (date-wise to-do list)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.noteDate = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    }
    
    let notes = await noteModel.find(query);
    res.json({
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const deletedNote = await noteModel.findOneAndDelete({
      _id: id,
    });
    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }
    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
      error: error.message
    });
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { title, content, priority, category, tags, noteDate, dueDate, status, color, isPinned, reminderDate, link } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (noteDate !== undefined) updateData.noteDate = noteDate ? new Date(noteDate) : null;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (status !== undefined) updateData.status = status;
    if (color !== undefined) updateData.color = color;
    if (isPinned !== undefined) updateData.isPinned = isPinned;
    if (reminderDate !== undefined) updateData.reminderDate = reminderDate ? new Date(reminderDate) : null;
    if (link !== undefined) updateData.link = link;

    const updatedNote = await noteModel.findOneAndUpdate(
      {
        _id: id,
      },
      updateData,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note updated successfully",
      note: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running!!");
});
