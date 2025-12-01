// src/componentes/Header.jsx

import React from 'react';
import { useTheme } from '../context/ThemaContext'; // Importe o hook

export default function Header() {
    // 1. Pega o tema atual e a função de alternância
    const { theme, toggleTheme } = useTheme(); 

    return (
        <header 
            style={{ 
                backgroundColor: 'var(--color-bg-secondary)', // Usa a cor do tema
                borderBottom: `1px solid var(--color-border)`,
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <h1>Poke-Deck</h1>
            
            <button
                onClick={toggleTheme} // 2. Aplica a função de alternância
                style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: 'var(--color-highlight)', // Usa cor de destaque
                    color: 'var(--color-bg-primary)', // Texto claro no botão
                    border: 'none',
                    borderRadius: '5px'
                }}
            >
                {/* 3. Mostra o tema atual no botão */}
                Mudar para Tema {theme === 'light' ? 'Escuro 🌙' : 'Claro ☀️'}
            </button>
        </header>
    );
}