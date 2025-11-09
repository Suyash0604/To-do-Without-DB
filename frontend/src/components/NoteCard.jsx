import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { FaRegFileAlt } from 'react-icons/fa';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 260;

export const CARD_DIMENSIONS = { width: CARD_WIDTH, height: CARD_HEIGHT };

const NoteCard = ({ note, dragConstraints, onEdit, onDelete }) => {
  const truncateText = (text, maxLength = 140) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const { words, completion } = useMemo(() => {
    const content = note.content ?? '';
    const wordCount = content.trim()
      ? content.trim().split(/\s+/).filter(Boolean).length
      : 0;

    return {
      words: wordCount,
      completion: Math.min(100, Math.round((wordCount / 200) * 100)),
    };
  }, [note.content]);

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
          relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing
          bg-zinc-700/80 border border-zinc-600 shadow-lg backdrop-blur-md
          p-6
        "
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        whileDrag={{ scale: 1.02 }}
      >
        {/* Background lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] right-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-40%] left-[-10%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-600 shadow-inner">
              <FaRegFileAlt className="w-6 h-6 text-white" />
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => onEdit(note)}
                className="w-8 h-8 flex items-center justify-center rounded-full 
                           bg-blue-500/20 border border-blue-400/40 text-blue-200"
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() => onDelete(note._id)}
                className="w-8 h-8 flex items-center justify-center rounded-full 
                           bg-red-500/20 border border-red-400/40 text-red-200"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <h3 className="text-lg font-semibold text-white">{note.title}</h3>
            <p className="text-sm text-zinc-300 line-clamp-4">
              {truncateText(note.content)}
            </p>
          </div>

          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="font-semibold tracking-wide">WORD COUNT</span>
              <span className="text-zinc-100 font-semibold">{words}</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-zinc-600 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                animate={{ width: `${completion}%` }}
              />
            </div>

            <div className="mt-3 w-full rounded-xl bg-zinc-800/70 border border-zinc-600
                            flex items-center justify-center py-2 text-sm font-medium text-zinc-200">
              {completion >= 100 ? 'Ready to publish' : 'Keep writing your story'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ✅ MOBILE HORIZONTAL CARD (sm:hidden) */}
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
          relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing
          bg-zinc-700/80 border border-zinc-600 shadow-lg backdrop-blur-md
          flex items-start gap-4 p-3 w-[90vw] h-28
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        whileDrag={{ scale: 1.02 }}
      >
        <div className="p-2 bg-zinc-800/80 rounded-lg border border-zinc-600 shadow-inner">
          <FaRegFileAlt className="w-5 h-5 text-white" />
        </div>

        <div className="flex flex-col flex-1 justify-center">
          <h3 className="text-base font-semibold text-white line-clamp-1">
            {note.title}
          </h3>
          <p className="text-xs text-zinc-300 line-clamp-1">
            {truncateText(note.content, 40)}
          </p>

          <div className="mt-2 h-2 rounded-full bg-zinc-600 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            onClick={() => onEdit(note)}
            className="w-7 h-7 flex items-center justify-center rounded-full 
                       bg-blue-500/20 border border-blue-400/40 text-blue-200"
          >
            <Edit3 className="w-3 h-3" />
          </motion.button>

          <motion.button
            onClick={() => onDelete(note._id)}
            className="w-7 h-7 flex items-center justify-center rounded-full 
                       bg-red-500/20 border border-red-400/40 text-red-200"
          >
            <Trash2 className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default NoteCard;
