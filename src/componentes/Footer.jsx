// Footer.jsx
import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <p>© 2025 PokéDeck • Feito com <span className="heart">❤️</span> e React</p>
        <p>Consumindo dados da <a href="https://pokemontcg.io" target="_blank" rel="noopener">Pokémon TCG API</a></p>
        <Link to="/curriculo">Currículo</Link>

      </div>
    </footer>
  );
};

export default Footer;