// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import List from "../componentes/List.jsx"; // <-- Pasta em português e extensão .jsx!
import "../styles/list.css";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  async function fetchCards() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.pokemontcg.io/v1/cards");
      if (!res.ok) throw new Error("Erro ao buscar cards da API");
      const data = await res.json();
      const items = data.cards || [];
      // opcional: limitar para evitar página pesada
      setCards(items.slice(0, 200));
      setFiltered(items.slice(0, 200));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);

  function filterType(type) {
    setActiveFilter(type);
    if (!type) {
      setFiltered(cards);
      return;
    }
    const result = cards.filter(c => c.types?.includes(type));
    setFiltered(result);
  }

  return (
    <main className="home">
      <section className="controls">
        <button
          className={!activeFilter ? "active" : ""}
          onClick={() => filterType(null)}
        >
          Todos
        </button>
        {["Water","Fire","Grass","Lightning"].map(t => (
          <button
            key={t}
            className={activeFilter === t ? "active" : ""}
            onClick={() => filterType(t)}
          >
            {t}
          </button>
        ))}
      </section>

      {loading && <p className="info">Carregando cards...</p>}
      {error && <p className="error">Erro: {error}</p>}

      {!loading && !error && (
        <List cards={filtered} />
      )}
    </main>
  );
}
