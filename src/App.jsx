import React, { useState, useCallback } from "react";
import { ModalProvider } from "./components/ModalsHandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import ProyectosPage from "./pages/ProyectosPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PasswordChange } from "./pages/PasswordChange";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./globals.css";

export default function App() {
  const [isLogged, setLogged] = useState(true);

  const onIniciarSesion = useCallback(() => {
    setLogged(true);
    console.log("Usuario logueado");
  }, []);

  const onRegistrarse = useCallback(() => {
    setLogged(true);
    console.log("Usuario registrado");
  }, []);

  const onCerrarSesion = useCallback(() => {
    setLogged(false);
    console.log("Sesión cerrada");
  }, []);

  return (
    <BrowserRouter>
      <ModalProvider
        onIniciarSesion={onIniciarSesion}
        onRegistrarse={onRegistrarse}
        onCerrarSesion={onCerrarSesion}
      >
        <Navbar isLogged={isLogged} logOutCallback={onCerrarSesion} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<LandingPage />} />
          <Route path="/contact-us" element={<LandingPage />} />
          <Route path="/participantes" element={<ParticipantesPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/settings/change-password"
            element={<PasswordChange />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ModalProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="justify-center text-center mt-12">
      <h1 className="text-7xl py-[20%]">404</h1>
    </div>
  );
}
