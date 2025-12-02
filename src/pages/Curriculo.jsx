// src/pages/Curriculo.jsx
import React from "react";
import "../styles/curriculo.css";

export default function Curriculo() {
  return (
    <div className="curriculo-container">
      <h1 className="curriculo-title">Hugo Alves</h1>

      <p className="curriculo-subtitle">Desenvolvedor Front-End • Estudante de ADS</p>

      <section className="curriculo-section">
        <h2>📌 Sobre mim</h2>
        <p>
          Sou estudante de Análise e Desenvolvimento de Sistemas com foco no desenvolvimento
          front-end. Gosto de aprender tecnologias novas e trabalhar em equipe.
        </p>
      </section>

      <section className="curriculo-section">
        <h2>🎓 Formação</h2>
        <ul>
          <li>Curso técnico ou graduação (exemplo)</li>
          <li>Cursos da área de tecnologia</li>
        </ul>
      </section>

      <section className="curriculo-section">
        <h2>💼 Experiências</h2>
        <ul>
          <li>Projeto escolar – PokeDeck (React, API, Rotas)</li>
          <li>Outros projetos pessoais</li>
        </ul>
      </section>

      <section className="curriculo-section">
        <h2>📞 Contato</h2>
        <p>Email: hugo@example.com</p>
        <p>GitHub: github.com/hugo</p>
      </section>
    </div>
  );
}
