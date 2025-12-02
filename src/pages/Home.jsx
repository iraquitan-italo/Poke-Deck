// src/pages/Home.jsx
import React, { useEffect, useState } from "react";

// imports corretos
import List from "../componentes/List.jsx";
import Section from "../componentes/Section.jsx";

import "../styles/list.css";

export default function Home() {
  // estado principal
  const [allCards, setAllCards] = useState([]);     // TODOS os cards (até 200) vindos da API/cache
  const [visibleCount, setVisibleCount] = useState(12); // quantos mostrar inicialmente
  const [displayCards, setDisplayCards] = useState([]); // slice visível (aplica filtro e paginação)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [isUsingCache, setIsUsingCache] = useState(false);

  // parametros
  const INITIAL_COUNT = 12;
  const PAGE_SIZE = 12; // quantos adicionar ao "Carregar mais"

  // função fetch (robusta)
  async function fetchCards() {
    setLoading(true);
    setError(null);
    setIsUsingCache(false);

    const URL = "https://api.pokemontcg.io/v1/cards";
    const TIMEOUT_MS = 15000;
    const MAX_RETRIES = 2;

    const fetchWithTimeout = (url, opts = {}, timeout = TIMEOUT_MS) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const timer = setTimeout(() => controller.abort(), timeout);
      return fetch(url, { ...opts, signal })
        .then(res => {
          clearTimeout(timer);
          return res;
        })
        .catch(err => {
          clearTimeout(timer);
          if (err && (err.name === "AbortError" || /aborted|timeout|Signal/.test(err.message))) {
            throw new Error("Request timed out");
          }
          throw err;
        });
    };

    let attempts = 0;
    let lastErr = null;

    while (attempts <= MAX_RETRIES) {
      try {
        attempts++;
        const res = await fetchWithTimeout(URL, { method: "GET", mode: "cors" }, TIMEOUT_MS);
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${res.statusText}${txt ? " - " + txt : ""}`);
        }

        const data = await res.json();
        const items = data.cards || [];

        // salva cache local (até 200)
        try {
          localStorage.setItem("cards_cache_v1", JSON.stringify({
            ts: Date.now(),
            items: items.slice(0, 200)
          }));
        } catch (e) {
          console.warn("[fetchCards] não foi possível salvar cache:", e);
        }

        // preenche allCards (até 200)
        const full = items.slice(0, Math.min(200, items.length));
        setAllCards(full);
        setVisibleCount(INITIAL_COUNT);
        setIsUsingCache(false);
        setLoading(false);
        return;
      } catch (err) {
        lastErr = err;
        console.warn(`[fetchCards] tentativa ${attempts} falhou:`, err?.message ?? err);
        if (attempts <= MAX_RETRIES) {
          const backoffMs = 500 * attempts;
          await new Promise(r => setTimeout(r, backoffMs));
          continue;
        }
        break;
      }
    }

    // fallback cache local
    try {
      const raw = localStorage.getItem("cards_cache_v1");
      if (raw) {
        const cache = JSON.parse(raw);
        if (cache && cache.items && cache.items.length) {
          setAllCards(cache.items);
          setVisibleCount(INITIAL_COUNT);
          setIsUsingCache(true);
          setLoading(false);
          setError(null);
          return;
        }
      }
    } catch (e) {
      console.warn("[fetchCards] erro ao ler cache local:", e);
    }

    setLoading(false);
    setError(lastErr?.message ? lastErr.message : "Falha ao buscar cards");
  }

  // aplica filtro e paginação: produz displayCards a partir de allCards, activeFilter, visibleCount
  function computeDisplay(all, filter, visible) {
    if (!all || all.length === 0) return [];
    const source = filter ? all.filter(c => c.types?.includes(filter)) : all;
    return source.slice(0, visible);
  }

  // carregar pela primeira vez
  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sempre que allCards, activeFilter ou visibleCount mudarem, recalcular display
  useEffect(() => {
    setDisplayCards(computeDisplay(allCards, activeFilter, visibleCount));
  }, [allCards, activeFilter, visibleCount]);

  // função para botão "Carregar mais"
  function loadMore() {
    setVisibleCount(prev => prev + PAGE_SIZE);
  }

  // filter handler
  function filterType(type) {
    setActiveFilter(type);
    setVisibleCount(INITIAL_COUNT); // quando troca filtro, volta à pagina 1
  }

  // skeletons (array para renderizar placeholders)
  const skeletonArray = new Array(INITIAL_COUNT).fill(0);

  return (
    <main className="home">
      {/* SECTION dos filtros */}
      <Section title="Filtros">
        <div className="controls">

          {/* Botão TODOS */}
          <button
            className={`type-btn type-all ${!activeFilter ? "active" : ""}`}
            onClick={() => filterType(null)}
          >
            Todos
          </button>

          {/* Botões de tipos */}
          {["Water", "Fire", "Grass", "Lightning"].map(t => (
            <button
              key={t}
              className={`type-btn type-${t.toLowerCase()} ${activeFilter === t ? "active" : ""}`}
              onClick={() => filterType(t)}
            >
              {t}
            </button>
          ))}
        </div>

      </Section>

      {/* SECTION da lista */}
      <Section title="Lista de Cards">
        {loading && (
          // mostra skeletons enquanto carrega
          <div className="list-grid">
            {skeletonArray.map((_, i) => (
              <div key={i} className="card-skeleton" aria-hidden="true" />
            ))}
          </div>
        )}

        {error && <p className="error">Erro: {error}</p>}

        {!loading && !error && (
          <>
            <List cards={displayCards} />

            {/* botão Carregar Mais — só aparece se houver mais itens disponíveis */}
            {(() => {
              const totalAvailable = activeFilter
                ? allCards.filter(c => c.types?.includes(activeFilter)).length
                : allCards.length;
              return displayCards.length < totalAvailable ? (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                  <button
                    className="controls-load-more controls-load-more--primary"
                    onClick={loadMore}
                  >
                    Carregar mais
                  </button>
                </div>
              ) : null;
            })()}
          </>
        )}
      </Section>
    </main>
  );
}
