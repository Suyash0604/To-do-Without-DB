import React, { useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [refreshNotes, setRefreshNotes] = useState(0);

  const handleNoteSaved = () => {
    setRefreshNotes(prev => prev + 1);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <NoteForm onNoteSaved={handleNoteSaved} />
            </div>
            <div>
              <NotesList refreshTrigger={refreshNotes} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
