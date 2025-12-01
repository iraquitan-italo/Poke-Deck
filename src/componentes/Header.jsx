import React, { useState, useEffect } from 'react';
import '../styles/header.css';

const Header = ({ toggleTheme, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="container header__container">
        
        {/* Logo Pokémon */}
        <a href="/" className="header__logo">
          <div className="logo-pokeball">
            <span className="pokeball-center"></span>
          </div>
          <h1>Poké<span>Deck</span></h1>
        </a>

        {/* Navegação */}
        <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="header__list">
            <li><a href="/" className="header__link">Home</a></li>
            <li><a href="/cards" className="header__link">Todos os Cards</a></li>
            <li><a href="/water" className="header__link type-water">Water</a></li>
            <li><a href="/fire" className="header__link type-fire">Fire</a></li>
            <li><a href="/grass" className="header__link type-grass">Grass</a></li>
            <li><a href="/lightning" className="header__link type-lightning">Lightning</a></li>
          </ul>
        </nav>

        {/* Botão Dark/Light + Menu Mobile */}
        <div className="header__actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Alternar tema">
            {currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button 
            className={`header__mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;