import React, { useState, useEffect } from 'react';
// Importa o hook para o tema
import { useTheme } from '../context/ThemaContext';
import { Link } from 'react-router-dom';

// Componente Header funcional
export default function Header() {
    // Puxa a função de alternar tema e o tema atual
    const { toggleTheme, currentTheme } = useTheme();

    // Estado para controle do menu mobile, se for necessário
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Função para alternar o estado do menu
    const handleToggleMobileMenu = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <header className="header">
            <div className="container header_container">
                {/* Logo e Nome do Projeto */}
                <div className="header_logo">
                    <Link to="/">
                        <span className="logo-pokeball"></span>
                        <span className="logo-text">Poke-Deck</span>
                    </Link>
                </div>

                {/* Navegação Principal */}
                <nav className={`header_nav ${isMobileOpen ? 'active' : ''}`}>
                    <ul className="header_list">
                        <li>
                            <Link to="/" onClick={handleToggleMobileMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/card/1" onClick={handleToggleMobileMenu}>Card Detalhes</Link>
                        </li>
                        <li>
                            <Link to="/curriculo" onClick={handleToggleMobileMenu}>Currículo</Link>
                        </li>
                    </ul>
                </nav>

                {/* Ações (Botão de Tema) */}
                <div className="header_actions">
                    {/* Botão de alternar tema */}
                    <button 
                        onClick={toggleTheme} 
                        className={`theme-toggle ${currentTheme === 'dark' ? 'active' : ''}`}
                        aria-label="Alterar tema"
                    >
                        {/* Ícones de sol ou lua, dependendo do tema */}
                        <span className={`icon ${currentTheme === 'light' ? 'icon-sun' : 'icon-moon'}`}></span>
                        {/* Texto opcional */}
                        <span className="theme-text">{currentTheme === 'light' ? 'Escuro' : 'Claro'}</span>
                    </button>

                    {/* Botão Mobile Toggle */}
                    <button className="header_mobile_toggle" onClick={handleToggleMobileMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}