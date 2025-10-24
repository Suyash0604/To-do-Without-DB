import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, BookOpen } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-6 flex flex-col relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full -translate-y-10 translate-x-10" />
      
      <div className="flex-1 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg"
          >
            <BookOpen className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>

        <h3 className="text-base font-bold text-gray-100 mb-3 line-clamp-2 leading-tight">
          {note.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-4">
          {truncateText(note.content)}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-2"
      >
        <motion.button
          onClick={() => onEdit(note)}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Edit3 className="w-3 h-3" />
          <span className="text-xs font-semibold">Edit</span>
        </motion.button>

        <motion.button
          onClick={() => onDelete(note._id)}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className="w-3 h-3" />
          <span className="text-xs font-semibold">Delete</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NoteCard;
