// src/components/Section.jsx
import React from "react";
import "../styles/section.css";
export default function Section({ title, children }) {
  return (
    <section className="section-container">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
