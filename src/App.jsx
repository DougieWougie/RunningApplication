import React, { useState, useEffect } from 'react';
import Converter from './components/Converter';
import PaceTable from './components/PaceTable';

function App() {
  const [theme, setTheme] = useState('light');
  const [highlightMph, setHighlightMph] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [selectedRowData, setSelectedRowData] = useState(null);

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

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const handleRowClick = (rowData) => {
    setHighlightMph(rowData.mph);
    setSelectedRowData(rowData);
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className="font-size-controls">
        <button
          className="font-size-btn"
          onClick={decreaseFontSize}
          disabled={fontSize <= 12}
          aria-label="Decrease Font Size"
        >
          A-
        </button>
        <button
          className="font-size-btn"
          onClick={increaseFontSize}
          disabled={fontSize >= 24}
          aria-label="Increase Font Size"
        >
          A+
        </button>
      </div>

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

      <Converter onSpeedChange={setHighlightMph} selectedRowData={selectedRowData} />
      <PaceTable highlightMph={highlightMph} onRowClick={handleRowClick} />
    </>
  );
}

export default App;
