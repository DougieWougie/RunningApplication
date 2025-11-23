import React, { useState, useEffect } from 'react';
import Converter from './components/Converter';
import PaceTable from './components/PaceTable';

function App() {
  const [theme, setTheme] = useState('light');
  const [highlightMph, setHighlightMph] = useState(null);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div style={{ marginBottom: '1rem' }}>
        <img
          src="/header-image.png"
          alt="Mascot"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid var(--color-primary)',
            boxShadow: 'var(--shadow-md)'
          }}
        />
      </div>

      <h1>Running Pace Calculator</h1>

      <Converter onSpeedChange={setHighlightMph} />
      <PaceTable highlightMph={highlightMph} onRowClick={setHighlightMph} />
    </>
  );
}

export default App;
