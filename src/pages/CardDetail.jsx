// src/pages/CardDetail.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/detail.css";

export default function CardDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const [usedCache, setUsedCache] = useState(false);

  const TIMEOUT_MS = 15000;
  const MAX_ATTEMPTS = 4;

  const getApiKey = () => {
    try { if (typeof import.meta !== "undefined" && import.meta?.env?.VITE_PTCG_API_KEY) return import.meta.env.VITE_PTCG_API_KEY; } catch(e){}
    try { if (typeof process !== "undefined" && process?.env?.REACT_APP_PTCG_API_KEY) return process.env.REACT_APP_PTCG_API_KEY; } catch(e){}
    try { return localStorage.getItem("PTCG_API_KEY"); } catch(e){ return null; }
  };

  const fetchWithTimeout = (url, opts = {}, timeout = TIMEOUT_MS) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout);
    return fetch(url, { ...opts, signal })
      .then(res => { clearTimeout(timer); return res; })
      .catch(err => { clearTimeout(timer); if (err.name === "AbortError") throw new Error("Request timed out"); throw err; });
  };

  const tryLoadFromCache = useCallback((cardId) => {
    try {
      const raw = localStorage.getItem("cards_cache_v1");
      if (!raw) return null;
      const cache = JSON.parse(raw);
      if (cache && Array.isArray(cache.items)) {
        return cache.items.find(c => c.id === cardId || (c.id && c.id.toString() === cardId)) || null;
      }
    } catch (e) {
      console.warn("[CardDetail] erro ao ler cache local:", e);
    }
    return null;
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!id) {
        setErrorInfo({ message: "ID do card não informado." });
        setLoading(false);
        return;
      }
      setLoading(true); setErrorInfo(null); setUsedCache(false); setCard(null);

      const cached = tryLoadFromCache(id);
      if (cached) { setCard(cached); setLoading(false); setUsedCache(true); }

      const apiKey = getApiKey();
      const headers = apiKey ? { "X-Api-Key": apiKey } : {};
      const endpoints = [
        `https://api.pokemontcg.io/v2/cards/${encodeURIComponent(id)}`,
        `https://api.pokemontcg.io/v1/cards/${encodeURIComponent(id)}`
      ];

      let finalErr = null;

      for (const endpoint of endpoints) {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS && !cancelled; attempt++) {
          try {
            const res = await fetchWithTimeout(endpoint, { method: "GET", mode: "cors", headers }, TIMEOUT_MS);
            if (!res.ok) { 
              const txt = await res.text().catch(()=> ""); 
              finalErr = { message: `HTTP ${res.status} ${res.statusText}`, status: res.status, body: txt }; 
              if (res.status===404) throw new Error("Not Found (404)");
              throw new Error(finalErr.message);
            }
            const payload = await res.json().catch(()=>{ throw new Error("Invalid JSON"); });
            const cardData = payload?.data ? payload.data : payload?.card ? payload.card : null;
            if (!cardData) { finalErr={message:"Payload não contém card"}; throw new Error("Payload inválido"); }
            if (cancelled) return;
            setCard(cardData); setLoading(false); setUsedCache(false);
            return;
          } catch (err) {
            const delay = 300 * Math.pow(2, attempt-1) + Math.floor(Math.random()*300);
            if (attempt < MAX_ATTEMPTS) await new Promise(r=>setTimeout(r, delay));
          }
        }
      }

      if (cached) {
        setLoading(false);
        setErrorInfo({ message: "Mostrando dados do cache local — falha ao atualizar do servidor." });
        return;
      }
      setLoading(false); setErrorInfo(finalErr ?? {message:"Falha desconhecida ao buscar card"});
    }
    load();
    return () => { cancelled = true; };
  }, [id, attemptKey, tryLoadFromCache]);

  const retry = () => { setAttemptKey(k => k + 1); setErrorInfo(null); setLoading(true); };

  if (loading && !card) {
    return (
      <main className="home">
        <section className="section-container">
          <h2 className="section-title">Carregando card...</h2>
          <div className="list-grid"><div className="card-skeleton" /></div>
        </section>
      </main>
    );
  }

  if (errorInfo && !card) {
    return (
      <main className="home">
        <section className="section-container">
          <h2 className="section-title">Erro ao carregar card</h2>
          <p className="error"><strong>{errorInfo.message}</strong></p>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            <button onClick={retry} className="controls-load-more controls-load-more--primary">Tentar novamente</button>
            <Link to="/">Voltar</Link>
          </div>
        </section>
      </main>
    );
  }

  const image = card?.images?.large || card?.images?.small || card?.imageUrlHiRes || card?.imageUrl || "/fallback-card.png";
  const name = card?.name || card?.title || "Sem nome";

  return (
    <main className="home">
      <section className="section-container">
        <h2 className="section-title">{name}</h2>
        <div className="card-detail-main">
          <div className="card-detail-thumb">
            <img src={image} alt={name} onError={e=>{ e.currentTarget.onerror=null; e.currentTarget.src="/fallback-card.png"; }} />
          </div>

          <div className="card-detail-info-box">
            <p><strong>ID:</strong> {card?.id ?? "-"}</p>
            {card?.types && (
              <p><strong>Tipos:</strong> {Array.isArray(card.types) ? card.types.map(t=><span key={t} className={`type-${t.toLowerCase()}`}>{t}</span>) : card.types}</p>
            )}
            {card?.rarity && <p><strong>Raridade:</strong> {card.rarity}</p>}
            {card?.set && <p><strong>Set:</strong> {card.set?.name ?? card.set}</p>}
            {card?.hp && <p><strong>HP:</strong> {card.hp}</p>}

            {card?.attacks && (
              <>
                <h4>Ataques</h4>
                <ul>
                  {card.attacks.map((atk, idx) => (
                    <li key={idx}><strong>{atk.name}</strong> — {atk.damage ?? ""} <div>{atk.text}</div></li>
                  ))}
                </ul>
              </>
            )}

            <Link to="/">← Voltar</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
