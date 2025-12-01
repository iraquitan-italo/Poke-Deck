// src/components/List.jsx
import React from "react";
import ListItem from "./ListItem";

export default function List({ cards }) {
  if (!cards || cards.length === 0) {
    return <p className="info">Nenhum card encontrado.</p>;
  }

  return (
    <div className="list-grid">
      {cards.map(card => (
        <ListItem key={card.id} card={card} />
      ))}
    </div>
  );
}
