import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import createNoteImage from '../assets/images/create_note-removebg-preview.png';

const CreateNote = () => {
  const navigate = useNavigate();

  const handleNoteCreated = () => {
    navigate('/board');
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center  pb-8 px-4">
      {/* Background gradient lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      </div>

      {/* Single container with image and form side by side */}
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl pt-1 pb-4 px-4 lg:px-6 bg-zinc-800/40 
                     border border-zinc-700 shadow-xl backdrop-blur-xl
                     grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
        >
          {/* Left Side - Image */}
          <div className="hidden lg:flex items-center justify-center">
            <img
              src={createNoteImage}
              alt="Create Note"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-h-[85vh] overflow-y-auto">
            <NoteForm onNoteSaved={handleNoteCreated} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreateNote;
