import React, { useEffect, useState, useRef } from 'react';
import NoteCard from './NoteCard';
import { getNotes, deleteNote } from '../services/api';
import NoteForm from './NoteForm';
import NoteDetailsModal from './NoteDetailsModal';
import { motion } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import createNoteImage from '../assets/images/create_note-removebg-preview.png';

const NotesList = ({ dragScopeRef }) => {

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    loadNotes();
  }, [filterDate]);

  const loadNotes = async () => {
    const n = await getNotes(filterDate || null);
    // Sort: pinned notes first, then by creation date
    const sorted = [...n].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });
    setNotes(sorted);
  };

  const clearFilter = () => {
    setFilterDate('');
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleEdit = (note) => setEditingNote(note);

  const handleViewDetails = (note) => setViewingNote(note);

  const handleSaved = () => {
    loadNotes();
    setEditingNote(null);
  };

  return (
    <div className="relative w-full h-full">
      {/* Edit Form Overlay */}
      {editingNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl pt-4 pb-4 px-4 lg:px-6 bg-zinc-800/40 
                         border border-zinc-700 shadow-xl backdrop-blur-xl
                         grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              {/* Left Side - Image */}
              <div className="hidden lg:flex items-center justify-center">
                <img
                  src={createNoteImage}
                  alt="Edit Note"
                  className="w-full max-w-md h-auto object-contain"
                />
              </div>

              {/* Right Side - Form */}
              <div className="w-full max-h-[85vh] overflow-y-auto">
                <NoteForm 
                  noteToEdit={editingNote} 
                  onNoteSaved={handleSaved} 
                  onCancel={() => setEditingNote(null)} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <NoteDetailsModal
        note={viewingNote}
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        onEdit={handleEdit}
      />

      {/* Date Filter */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <label className="text-sm font-semibold text-gray-300">
            Filter by Date:
          </label>
        </div>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="input-field text-sm py-2 w-48"
          placeholder="Select date"
        />
        {filterDate && (
          <button
            onClick={clearFilter}
            className="px-3 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            dragConstraints={dragScopeRef}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
