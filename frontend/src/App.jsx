import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Background from './components/Background';
import CreateNote from './pages/CreateNote';
import NotesBoard from './pages/NotesBoard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="px-6 py-4 flex-1 w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/create" replace />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/board" element={<NotesBoard />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
