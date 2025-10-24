import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Sparkles, PenTool } from 'lucide-react';
import { createNote, updateNote } from '../services/api';

const NoteForm = ({ noteToEdit, onNoteSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    title: noteToEdit?.title || '',
    content: noteToEdit?.content || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsLoading(true);
    try {
      if (noteToEdit) {
        await updateNote(noteToEdit._id, formData);
      } else {
        await createNote(formData);
      }
      onNoteSaved();
      setFormData({ title: '', content: '' });
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    onCancel?.();
  };

  return (
    <div className="card p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-600/10 rounded-full translate-y-12 -translate-x-12" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg"
          >
            {noteToEdit ? (
              <Edit3 className="w-5 h-5 text-white" />
            ) : (
              <PenTool className="w-5 h-5 text-white" />
            )}
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-gray-100">
              {noteToEdit ? 'Edit Note' : 'Create New Note'}
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              {noteToEdit ? 'Update your thoughts' : 'Capture your ideas'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Enter a captivating title..."
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field h-32 resize-none"
              placeholder="Write your thoughts, ideas, or anything that comes to mind..."
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex space-x-3"
          >
            <motion.button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {noteToEdit ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span className="text-sm">{noteToEdit ? 'Update Note' : 'Create Note'}</span>
                </>
              )}
            </motion.button>

            {noteToEdit && (
              <motion.button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            )}
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default NoteForm;
