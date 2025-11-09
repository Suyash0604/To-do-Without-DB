import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import NotesList from '../components/NotesList';

const NotesBoard = () => {
  const boardRef = useRef(null);

  return (
    <section
      ref={boardRef}
      className="relative z-10 min-h-screen w-full overflow-visible"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full min-h-screen"
      >
        <NotesList dragScopeRef={boardRef} />
      </motion.div>
    </section>
  );
};

export default NotesBoard;
