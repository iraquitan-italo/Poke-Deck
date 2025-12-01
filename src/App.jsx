// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Contexto de tema
import { ThemeProvider } from "./context/ThemeContext";

// Componentes globais
import Header from "./components/Header";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import CardDetail from "./pages/CardDetail";
import Curriculo from "./pages/Curriculo";

// Estilos globais
import "./styles/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-root">
          <Header />

          <main className="app-main" style={{ minHeight: "70vh", padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/card/:id" element={<CardDetail />} />
              <Route path="/curriculo" element={<Curriculo />} />

              <Route path="/404" element={<p>Página não encontrada.</p>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
