''

import React from 'react';
import '../styles/footer.css';

// Usamos a função padrão 'export default function' para funcionar no App.jsx
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer_content">
                <p>© 2025 PokeDeck. Feito com <span className="heart"></span> e React</p>
                <p>Consumindo dados da <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">Pokémon TCG API</a></p>
            </div>
        </footer>
    );
}