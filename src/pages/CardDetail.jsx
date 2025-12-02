import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/detail.css';

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usedCache, setUsedCache] = useState(false);

  const fetchWithTimeout = (url, timeout = 15000) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout);
    return fetch(url, { signal })
      .finally(() => clearTimeout(timer));
  };

  const tryLoadFromCache = useCallback((cardId) => {
    try {
      const raw = localStorage.getItem('cards_cache_v1');
      if (!raw) return null;
      const cache = JSON.parse(raw);
      if (cache && Array.isArray(cache.items)) {
        return cache.items.find(c => c.id === cardId || (c.id && c.id.toString() === cardId)) || null;
      }
    } catch (e) {
      console.warn('[CardDetail] erro ao ler cache local:', e);
    }
    return null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadCard() {
      setLoading(true);
      setError(null);

      // 1) tentar cache primeiro
      const cached = tryLoadFromCache(id);
      if (cached && !cancelled) {
        setCard(cached);
        setUsedCache(true);
        setLoading(false);
      }

      // 2) buscar API em background
      try {
        const res = await fetchWithTimeout(`https://api.pokemontcg.io/v1/cards/${id}`);
        if (!res.ok) throw new Error('Falha ao buscar card na API');
        const data = await res.json();
        if (!cancelled) {
          setCard(data.card);
          setUsedCache(false);
        }
      } catch (err) {
        if (!cached && !cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCard();

    return () => { cancelled = true; };
  }, [id, tryLoadFromCache]);

  if (loading && !card) return <div className="detail-container">Carregando detalhe do card...</div>;
  if (error && !card) return <div className="detail-container">Erro ao carregar: {error}</div>;
  if (!card) return <div className="detail-container">Card não encontrado.</div>;

  const image = card.imageUrlHiRes || card.imageUrl || '/fallback-card.png';

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Voltar para Home
      </button>


      <div className="card-content">
        <img src={image} alt={card.name} className="card-image" />
        <div className="card-info">
          <h1>{card.name}</h1>
          <p><strong>Tipo(s):</strong> {card.types ? card.types.join(', ') : 'N/A'}</p>
          <p><strong>Raridade:</strong> {card.rarity || 'Desconhecida'}</p>
          <p><strong>Expansão:</strong> {card.set || 'N/A'}</p>
          <p><strong>HP:</strong> {card.hp || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
