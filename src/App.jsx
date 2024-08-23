import React, { useState, useCallback } from "react";
import { ModalProvider } from "./components/ModalsHandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ParticipantesPage from "./pages/Participantes/ParticipantesPage";
import ProyectosPage from "./pages/Proyectos/ProyectosPage";
import Navbar from "./components/Navbar/Navbar";
import Navbar_User from "./components/Navbar-User/Navbar_User";
import Footer from "./components/Footer/Footer";

import "./App.css";

export default function App() {
  const [isLogueado, setLogueado] = useState(false);

  const onIniciarSesion = useCallback(() => {
    setLogueado(true);
    console.log("Usuario logueado");
  }, []);

  const onRegistrarse = useCallback(() => {
    setLogueado(true);
    console.log("Usuario registrado");
  }, []);

  const onCerrarSesion = useCallback(() => {
    setLogueado(false);
    console.log("Sesión cerrada");
  }, []);

  return (
    <BrowserRouter>
      <ModalProvider
        onIniciarSesion={onIniciarSesion}
        onRegistrarse={onRegistrarse}
        onCerrarSesion={onCerrarSesion}
      >
        {isLogueado ? (
          <Navbar_User logOutCallback={onCerrarSesion} />
        ) : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<HomePage />} />
          <Route path="/contact-us" element={<HomePage />} />
          <Route path="/participantes" element={<ParticipantesPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ModalProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
