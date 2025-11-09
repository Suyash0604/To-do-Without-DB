import React, { useEffect, useState, useRef } from 'react';
import NoteCard from './NoteCard';
import { getNotes, deleteNote } from '../services/api';
import NoteForm from './NoteForm';
import { motion } from 'framer-motion';

const NotesList = ({ dragScopeRef }) => {

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const n = await getNotes();
    setNotes(n);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleEdit = (note) => setEditingNote(note);

  const handleSaved = () => {
    loadNotes();
    setEditingNote(null);
  };

  return (
    <div className="relative w-full h-full flex gap-3 flex-wrap">
      {editingNote && (
        <NoteForm noteToEdit={editingNote} onNoteSaved={handleSaved} onCancel={() => setEditingNote(null)} />
      )}

      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          dragConstraints={dragScopeRef}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NotesList;
