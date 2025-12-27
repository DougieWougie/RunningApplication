import React, { useState, useEffect } from 'react';
import Converter from './components/Converter';
import PaceTable from './components/PaceTable';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });
  
  const [highlightMph, setHighlightMph] = useState(null);
  
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseInt(savedFontSize) : 16;
  });
  
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

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
      <div className="app-header">
        <div className="controls-row">
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
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className="header-image-container">
        <img
          className="header-image"
          src="/header-image.png"
          alt="Mascot"
        />
      </div>

      <h1>Running Pace Calculator</h1>

      <Converter onSpeedChange={setHighlightMph} selectedRowData={selectedRowData} />
      <PaceTable highlightMph={highlightMph} onRowClick={handleRowClick} />

      <footer className="footer">
        <p>
          <a
            href="https://github.com/DougieWougie/RunningApplication"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          {' • '}
          Licensed under MIT
        </p>
      </footer>
    </>
  );
}

export default App;
