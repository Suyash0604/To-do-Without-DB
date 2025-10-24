import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Always dark mode

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark'); // Always add dark class
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Disabled - always dark mode
    return;
  };

  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
