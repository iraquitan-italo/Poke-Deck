import React from "react";
import ListItem from "./ListItem";
import "../styles/list.css"; // garante que o CSS da lista seja carregado

export default function List({ cards }) {
  if (!cards || cards.length === 0) {
    return <p className="info">Nenhum card encontrado.</p>;
  }

  return (
    <ul className="list-grid" role="list" aria-live="polite">
      {cards.map((card, idx) => (
        <li
          key={card?.id ?? `${card?.name ?? 'card'}-${idx}`}
          className="list-grid__item"
        >
          <ListItem card={card} />
        </li>
      ))}
    </ul>
  );
}
