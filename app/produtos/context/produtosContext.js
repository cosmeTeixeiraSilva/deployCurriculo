"use client";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    //Funções Globais para a rota Produtos   
    const [menuAberto, setMenuAberto] = useState(false);



    //Fim das variaveis globais
    return (
        <DashboardContext.Provider value={{ menuAberto, setMenuAberto }}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    return useContext(DashboardContext);
}
