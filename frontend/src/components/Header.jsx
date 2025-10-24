import React from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect border-b border-gray-700/20"
    >
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            >
              <StickyNote className="w-5 h-5 text-white" />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Smart Notes
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Your digital notebook
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
