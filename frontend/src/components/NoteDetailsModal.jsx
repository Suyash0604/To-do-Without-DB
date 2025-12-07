import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, Pin, ExternalLink, Clock } from 'lucide-react';

const NoteDetailsModal = ({ note, isOpen, onClose, onEdit }) => {
  if (!note) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl 
                         bg-zinc-800 border border-zinc-700 shadow-2xl"
              style={{
                backgroundColor: note.color ? `${note.color}10` : '#27272a',
                borderColor: note.color || '#52525b'
              }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 p-6 pb-4 border-b border-zinc-700 backdrop-blur-md bg-zinc-800/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    {note.isPinned && (
                      <Pin className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    )}
                    <h2 className="text-2xl font-bold text-white">{note.title}</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {note.priority && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(note.priority)}`}>
                      {note.priority.toUpperCase()}
                    </span>
                  )}
                  {note.status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(note.status)}`}>
                      {note.status.replace('-', ' ').toUpperCase()}
                    </span>
                  )}
                  {note.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-zinc-200 bg-zinc-600">
                      {note.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Content/Description */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Content</h3>
                  <p className="text-zinc-200 whitespace-pre-wrap leading-relaxed">{note.content || 'No content'}</p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {note.noteDate && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/50">
                      <Calendar className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Note Date</p>
                        <p className="text-sm text-zinc-200">{formatDate(note.noteDate)}</p>
                      </div>
                    </div>
                  )}

                  {note.dueDate && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/50">
                      <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Due Date</p>
                        <p className="text-sm text-zinc-200">{formatDate(note.dueDate)}</p>
                      </div>
                    </div>
                  )}

                  {note.reminderDate && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/50">
                      <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Reminder</p>
                        <p className="text-sm text-zinc-200">{formatDateTime(note.reminderDate)}</p>
                      </div>
                    </div>
                  )}

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/50">
                      <Tag className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded text-xs font-medium text-zinc-200 bg-zinc-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {note.link && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-700/50">
                      <ExternalLink className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Link</p>
                        <a
                          href={note.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 truncate block underline"
                        >
                          {note.link}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamps */}
                {(note.createdAt || note.updatedAt) && (
                  <div className="pt-4 border-t border-zinc-700">
                    <div className="flex flex-col gap-2 text-xs text-zinc-400">
                      {note.createdAt && (
                        <p>
                          <span className="font-semibold">Created:</span>{' '}
                          {formatDateTime(note.createdAt)}
                        </p>
                      )}
                      {note.updatedAt && (
                        <p>
                          <span className="font-semibold">Last Updated:</span>{' '}
                          {formatDateTime(note.updatedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 p-4 border-t border-zinc-700 bg-zinc-800/80 backdrop-blur-md">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => {
                      onEdit(note);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                  >
                    Edit Note
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NoteDetailsModal;

