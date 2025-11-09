import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';

const CreateNote = () => {
  const navigate = useNavigate();

  const handleNoteCreated = () => {
    navigate('/board');
  };

  return (
    <section className="relative z-10 py-20">

      {/* Background gradient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      </div>

      {/* Centered form container */}
      <div className="max-w-4xl mx-auto px-6 flex justify-center items-start">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-full rounded-3xl p-10 bg-zinc-800/40 
                     border border-zinc-700 shadow-xl backdrop-blur-xl"
        >
          <NoteForm onNoteSaved={handleNoteCreated} />
        </motion.div>

      </div>
    </section>
  );
};

export default CreateNote;
