import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/detail.css';

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`https://api.pokemontcg.io/v1/cards/${id}`);
        if (!response.ok) {
          throw new Error('Falha na busca do card');
        }
        const data = await response.json();
        setCard(data.card);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) return <div className="detail-container">Carregando detalhes do card...</div>;
  if (error) return <div className="detail-container">Erro ao carregar: {error}</div>;
  if (!card) return <div className="detail-container">Card não encontrado.</div>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        Voltar para Home
      </button>

      <div className="card-content">
        <img
          src={card.imageUrlHiRes || card.imageUrl}
          alt={card.name}
          className="card-image"
        />

        <div className="card-info">
          <h1>{card.name}</h1>

          <p>
            <strong>Tipo(s):</strong>{" "}
            <span className="type">{card.types ? card.types.join(', ') : 'N/A'}</span>
          </p>

          <p>
            <strong>Raridade:</strong> {card.rarity || 'Desconhecida'}
          </p>

          <p>
            <strong>Expansão:</strong> {card.set || 'N/A'}
          </p>

          <p>
            <strong>HP:</strong> {card.hp || 'N/A'}
          </p>

          <p>
            <a
              href="/curriculo"
              style={{ color: 'var(--primary-color)' }}
            >
              Meu Currículo
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
