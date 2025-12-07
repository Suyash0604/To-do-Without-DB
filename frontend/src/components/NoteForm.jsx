import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit3, Sparkles, PenTool } from 'lucide-react';
import { createNote, updateNote } from '../services/api';

const NoteForm = ({ noteToEdit, onNoteSaved, onCancel, showImage }) => {
  const [formData, setFormData] = useState({
    title: noteToEdit?.title || '',
    content: noteToEdit?.content || '',
    priority: noteToEdit?.priority || 'medium',
    category: noteToEdit?.category || '',
    tags: noteToEdit?.tags?.join(', ') || '',
    noteDate: noteToEdit?.noteDate ? new Date(noteToEdit.noteDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: noteToEdit?.dueDate ? new Date(noteToEdit.dueDate).toISOString().split('T')[0] : '',
    status: noteToEdit?.status || 'pending',
    color: noteToEdit?.color || '#6366f1',
    isPinned: noteToEdit?.isPinned || false,
    reminderDate: noteToEdit?.reminderDate ? new Date(noteToEdit.reminderDate).toISOString().split('T')[0] : '',
    link: noteToEdit?.link || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
      };
      
      if (noteToEdit) {
        await updateNote(noteToEdit._id, submitData);
      } else {
        await createNote(submitData);
      }
      onNoteSaved();
      setFormData({ 
        title: '', 
        content: '', 
        priority: 'medium', 
        category: '', 
        tags: '', 
        noteDate: new Date().toISOString().split('T')[0],
        dueDate: '', 
        status: 'pending', 
        color: '#6366f1', 
        isPinned: false, 
        reminderDate: '', 
        link: '' 
      });
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ 
      title: '', 
      content: '', 
      priority: 'medium', 
      category: '', 
      tags: '', 
      noteDate: new Date().toISOString().split('T')[0],
      dueDate: '', 
      status: 'pending', 
      color: '#6366f1', 
      isPinned: false, 
      reminderDate: '', 
      link: '' 
    });
    onCancel?.();
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <form onSubmit={handleSubmit} className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field text-sm py-2"
              placeholder="Enter a captivating title..."
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field h-20 resize-none text-sm py-2"
              placeholder="Write your thoughts, ideas, or anything that comes to mind..."
              required
            />
          </motion.div>

          {/* Additional Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Note Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={formData.noteDate}
                onChange={(e) => setFormData({ ...formData, noteDate: e.target.value })}
                className="input-field text-sm py-2"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.33, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="input-field text-sm py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.34, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="input-field text-sm py-2"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field text-sm py-2"
                placeholder="e.g., Work, Personal"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="input-field text-sm py-2"
                placeholder="tag1, tag2, tag3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.37, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input-field text-sm py-2"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Reminder Date
              </label>
              <input
                type="date"
                value={formData.reminderDate}
                onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
                className="input-field text-sm py-2"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.39, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Color
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="input-field h-8 w-full cursor-pointer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Link
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="input-field text-sm py-2"
                placeholder="https://..."
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.41, duration: 0.6 }}
            className="flex items-center space-x-2 pt-1"
          >
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-4 h-4 rounded border-gray-600 bg-zinc-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="isPinned" className="text-xs font-semibold text-gray-300 cursor-pointer">
              Pin this note
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="flex space-x-3 pt-1"
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
