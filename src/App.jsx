// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Contexto de tema (criado por quem fez a parte do tema)
import { ThemeProvider } from "./context/ThemeContext";

// Componentes globais
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

// Páginas
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";
import Curriculo from "./pages/Curriculo";

// Estilos globais (variáveis de tema, reset e regras gerais)
import "./styles/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-root">
          {/* Header fica em todas as páginas */}
          <Header />

          {/* Conteúdo principal */}
          <main className="app-main" style={{ minHeight: "70vh", padding: "1rem" }}>
            <Routes>
              {/* Página inicial com lista e filtros */}
              <Route path="/" element={<Home />} />

              {/* Página de detalhe do card (rota dinâmica) */}
              <Route path="/card/:id" element={<CardDetail />} />

              {/* Página do currículo */}
              <Route path="/curriculo" element={<Curriculo />} />

              {/* Redirecionamento ou página 404 simples */}
              <Route path="/404" element={<p>Página não encontrada.</p>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>

          {/* Footer em todas as páginas */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

