import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">

        <p>© 2025 PokéDeck • Feito com <span className="heart"></span> React</p>

        <p>
          Consumindo dados da <br/> 
          <a href="https://pokemontcg.io" target="_blank" rel="noopener noreferrer">
           Pokémon TCG API
          </a>
        </p>

        <Link to="/curriculo">Currículo</Link>

      </div>
    </footer>
  );
};

export default Footer;
