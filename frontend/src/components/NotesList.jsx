import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, FileText, Sparkles, BookOpen } from 'lucide-react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { getNotes, deleteNote } from '../services/api';

const NotesList = ({ refreshTrigger }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleNoteSaved = () => {
    fetchNotes();
    setEditingNote(null);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-12 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
        />
        <p className="text-gray-400 font-medium">Loading your notes...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"
          >
            <BookOpen className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              Your Notes
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-12 text-center flex-1 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full flex items-center justify-center mb-6"
            >
              <FileText className="w-10 h-10 text-gray-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">
              No notes yet
            </h3>
            <p className="text-gray-400 max-w-sm">
              Start capturing your thoughts and ideas by creating your first note!
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {notes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                layout
              >
                <NoteCard
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {editingNote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleCancelEdit}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NoteForm
              noteToEdit={editingNote}
              onNoteSaved={handleNoteSaved}
              onCancel={handleCancelEdit}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotesList;
