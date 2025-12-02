import React from "react";
import { Link } from "react-router-dom";

function ListItemComponent({ card }) {
  const image = card?.imageUrl || card?.imageUrlHiRes || "/fallback-card.png";
  const cardName = card?.name ?? "Sem nome";

  return (
    <Link
      to={`/card/${card?.id ?? ''}`}
      className="card-item"
      title={cardName}
      aria-label={`Abrir detalhes de ${cardName}`}
    >
      <article className="card-inner" role="article" aria-roledescription="card">
        <div className="card-thumb" aria-hidden={image ? "false" : "true"}>
          <img
            src={image}
            alt={cardName}
            loading="lazy"
            onError={(e) => {
              // use currentTarget para evitar warnings e ataque de recursão
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/fallback-card.png";
            }}
          />
        </div>

        <div className="card-body">
          <h4>{cardName}</h4>
          <p className="types">
            {(card?.types && card.types.length) ? card.types.join(", ") : "Tipo não informado"}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default React.memo(ListItemComponent);
