// src/context/ThemaContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Criação do Contexto
// Ele vai segurar o tema atual ('light' ou 'dark') e a função de toggle
export const ThemaContext = createContext();

// 2. Componente Provedor
export default function ThemaProvider({ children }) {
    // Inicializa o tema verificando se há uma preferência salva no localStorage
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme : 'light'; // Padrão é 'light'
    });

    // 3. Efeito para aplicar as variáveis CSS (e salvar no localStorage)
    useEffect(() => {
        const root = document.documentElement;

        // Aplica o data-theme na tag <html> para o CSS saber qual tema aplicar
        root.setAttribute('data-theme', theme);
        
        // Salva a preferência do usuário para persistir ao recarregar
        localStorage.setItem('theme', theme);
    }, [theme]); // Roda sempre que 'theme' mudar

    // 4. Função de alternância
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemaContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemaContext.Provider>
    );
}

// 5. Custom Hook para facilitar o uso nos componentes (Ex: const { toggleTheme } = useTheme();)
export function useTheme() {
    return useContext(ThemaContext);
}