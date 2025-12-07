import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Pin, Info } from 'lucide-react';
import { FaRegFileAlt } from 'react-icons/fa';

const CARD_SIZE = 140;

export const CARD_DIMENSIONS = { width: CARD_SIZE, height: CARD_SIZE };

const NoteCard = ({ note, dragConstraints, onEdit, onDelete, onViewDetails }) => {
  const truncateText = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      {/* ✅ DESKTOP CARD (sm and up) */}
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        dragMomentum={true}
        dragTransition={{
          power: 0.4,
          timeConstant: 300,
          bounceDamping: 10,
          bounceStiffness: 100,
        }}
        className="
          hidden sm:block
          relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing
          shadow-lg backdrop-blur-md
          p-2
        "
        style={{ 
          width: CARD_SIZE, 
          height: CARD_SIZE,
          backgroundColor: note.color ? `${note.color}15` : '#3f3f4615',
          borderColor: note.color || '#52525b',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.05 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with pin and actions */}
          <div className="flex items-start justify-between mb-1.5">
            <div className="flex items-center gap-1">
              {note.isPinned && <Pin className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
              <div className="p-1 bg-zinc-800/80 rounded border border-zinc-600">
                <FaRegFileAlt className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="flex gap-1">
              <motion.button
                onClick={(e) => { e.stopPropagation(); onViewDetails(note); }}
                className="w-5 h-5 flex items-center justify-center rounded-full 
                           bg-purple-500/20 border border-purple-400/40 text-purple-200"
                title="View Details"
              >
                <Info className="w-2.5 h-2.5" />
              </motion.button>
            </div>
          </div>

          {/* Title Only */}
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-xs font-semibold text-white text-center line-clamp-3 leading-tight px-1">
              {truncateText(note.title, 50)}
            </h3>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-center gap-1.5 mt-auto pt-1.5">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className="w-5 h-5 flex items-center justify-center rounded-full 
                         bg-blue-500/20 border border-blue-400/40 text-blue-200"
              title="Edit"
            >
              <Edit3 className="w-2.5 h-2.5" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
              className="w-5 h-5 flex items-center justify-center rounded-full 
                         bg-red-500/20 border border-red-400/40 text-red-200"
              title="Delete"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ✅ MOBILE CARD (sm:hidden) */}
      <motion.div
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        dragMomentum={true}
        dragTransition={{
          power: 0.4,
          timeConstant: 300,
          bounceDamping: 10,
          bounceStiffness: 100,
        }}
        className="
          sm:hidden
          relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing
          shadow-lg backdrop-blur-md
          p-2
        "
        style={{ 
          width: CARD_SIZE, 
          height: CARD_SIZE,
          backgroundColor: note.color ? `${note.color}15` : '#3f3f4615',
          borderColor: note.color || '#52525b',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.05 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-1.5">
            <div className="flex items-center gap-1">
              {note.isPinned && <Pin className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
              <div className="p-1 bg-zinc-800/80 rounded border border-zinc-600">
                <FaRegFileAlt className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <motion.button
              onClick={(e) => { e.stopPropagation(); onViewDetails(note); }}
              className="w-5 h-5 flex items-center justify-center rounded-full 
                         bg-purple-500/20 border border-purple-400/40 text-purple-200"
              title="View Details"
            >
              <Info className="w-2.5 h-2.5" />
            </motion.button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-xs font-semibold text-white text-center line-clamp-3 leading-tight px-1">
              {truncateText(note.title, 50)}
            </h3>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-auto pt-1.5">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className="w-5 h-5 flex items-center justify-center rounded-full 
                         bg-blue-500/20 border border-blue-400/40 text-blue-200"
              title="Edit"
            >
              <Edit3 className="w-2.5 h-2.5" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
              className="w-5 h-5 flex items-center justify-center rounded-full 
                         bg-red-500/20 border border-red-400/40 text-red-200"
              title="Delete"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NoteCard;
