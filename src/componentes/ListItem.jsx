// src/components/ListItem.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ card }) {
  const image = card.imageUrl || card.imageUrlHiRes || "";

  return (
    <Link to={`/card/${card.id}`} className="card-item" title={card.name}>
      <div className="card-thumb">
        <img
          src={image}
          alt={card.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-card.png"; // opcional: coloque uma imagem de fallback em public/
          }}
        />
      </div>

      <div className="card-body">
        <h4>{card.name}</h4>
        <p className="types">{card.types?.join(", ") || "Tipo não informado"}</p>
      </div>
    </Link>
  );
}
