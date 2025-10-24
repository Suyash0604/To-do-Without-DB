const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/db/db");
const app = express();

const noteModel = require("./src/models/note.model");

connectToDB();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldd");
});

app.post("/create", async (req, res) => {
  try {
    let { title, content } = req.body;
    const newNote = await noteModel.create({
      title: title,
      content: content,
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
    let notes = await noteModel.find();
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
    let { title, content } = req.body;

    const updatedNote = await noteModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title: title,
        content: content
      },
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
