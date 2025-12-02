// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import List from "../componentes/List.jsx";
import Section from "../componentes/Section.jsx"; 
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

      {/* SECTION dos filtros */}
      <Section title="Filtros">
        <div className="controls">
          <button
            className={!activeFilter ? "active" : ""}
            onClick={() => filterType(null)}
          >
            Todos
          </button>

          {["Water", "Fire", "Grass", "Lightning"].map(type => (
            <button
              key={type}
              className={activeFilter === type ? "active" : ""}
              onClick={() => filterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </Section>

      {/* SECTION da lista */}
      <Section title="Lista de Cards">
        {loading && <p className="info">Carregando cards...</p>}
        {error && <p className="error">Erro: {error}</p>}
        {!loading && !error && <List cards={filtered} />}
      </Section>

    </main>
  );
}
