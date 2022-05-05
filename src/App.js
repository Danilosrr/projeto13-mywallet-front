import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoadingContext from "./contexts/LoadingContext";

import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Registros from "./components/Registros";
import NovaEntrada from "./components/NovaEntrada"

import "./assets/css/reset.css";
import "./assets/css/fonts.css";

export default function App(){

    const [loading,setLoading] = useState(false)

    return(
        <LoadingContext.Provider value={{loading,setLoading}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                    <Route path="/registros" element={<Registros/>}/>
                    <Route path="/entrada" element={<NovaEntrada entrada={true} />}/>  
                    <Route path="/saida" element={<NovaEntrada entrada={false} />}/>
                </Routes>
            </BrowserRouter>
        </LoadingContext.Provider>
    ) 
}