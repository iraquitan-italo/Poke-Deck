import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import "../styles/header.css";

export default function Header() {
  const { toggleTheme, theme } = useTheme();

  // Estado para controle do menu mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Alterna o menu mobile
  const handleToggleMobileMenu = () => {
    setIsMobileOpen(prev => !prev);
  };

  // Fecha o menu mobile (usar nos Links)
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <header className="header">
      <div className="container header__container">
        {/* Logo e Nome do Projeto */}
        <div className="header__logo">
          <Link to="/" className="header__link" onClick={closeMobileMenu}>
            <span className="logo-pokeball" aria-hidden="true"></span>
            <span className="logo-text">Poke-Deck</span>
          </Link>
        </div>

        {/* Navegação Principal */}
        <nav
          id="main-navigation"
          className={`header__nav ${isMobileOpen ? 'active' : ''}`}
          aria-label="Navegação principal"
        >
          <ul className="header__list">
            <li>
              <Link to="/" className="header__link" onClick={closeMobileMenu}>Home</Link>
            </li>

          </ul>
        </nav>

        {/* Ações (Botão de Tema + Botão Mobile) */}
        <div className="header__actions">
          {/* Botão de alternar tema */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
            aria-pressed={theme === 'dark'}
            aria-label="Alternar tema"
            title={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
          >
            <span className={`icon ${theme === 'light' ? 'icon-sun' : 'icon-moon'}`} aria-hidden="true"></span>
            <span className="theme-text">
              {theme === 'light' ? 'Escuro' : 'Claro'}
            </span>
          </button>

          {/* Botão Mobile Toggle (hambúrguer) */}
          <button
            type="button"
            className={`header__mobile-toggle ${isMobileOpen ? 'active' : ''}`}
            onClick={handleToggleMobileMenu}
            aria-controls="main-navigation"
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
