import React from 'react';
// Importa o BrowserRouter e outras ferramentas de rotas
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Importa o Provider do seu Contexto (ThemaContext com 'a')
import { ThemaProvider } from './context/ThemaContext';
// Importa os estilos globais
import './styles/global.css'; 

// Componentes globais (Pasta componentes, com extensão .jsx)
import Header from './componentes/Header.jsx'; 
import Footer from './componentes/Footer.jsx'; 

// Páginas (Pasta pages, com extensão .jsx)
import Home from './pages/Home.jsx';
import CardDetail from './pages/CardDetail.jsx';
import Curriculo from './pages/Curriculo.jsx';

// -------------------------------------------------------------
// FUNÇÃO PRINCIPAL DO COMPONENTE APP (AQUI FICA A ESTRUTURA)
// -------------------------------------------------------------
export default function App() {
    return (
        // 1. O Provider do Tema deve envolver toda a aplicação
        <ThemaProvider> 
            <BrowserRouter>
                {/* 2. Componente Header (fixo no topo) */}
                <Header />
                
                <main className="app-main">
                    {/* 3. Área de Rotas */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/card/:id" element={<CardDetail />} />
                        <Route path="/curriculo" element={<Curriculo />} />

                        {/* Rota 404 - Página não encontrada */}
                        <Route path="/404" element={<h1>404 | Página não encontrada</h1>} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </main>
                
                {/* 4. Componente Footer (fixo no rodapé) */}
                <Footer />
            </BrowserRouter>
        </ThemaProvider>
    );
}