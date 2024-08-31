import React, { useState, useCallback } from "react";
import { ModalProvider } from "./components/ModalsHandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import ProyectosPage from "./pages/ProyectosPage";
import { SettingsPage } from "./pages/SettingsPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./globals.css";

export default function App() {
  const [isLogged, setLogged] = useState(false);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: ""
  });

  const onIniciarSesion = useCallback((datosUsuario) => {
    setUsuario({
      nombre: datosUsuario.nombre,
      email: datosUsuario.mail,
    })
    setLogged(true);
  }, []);
  
  const onRegistrarse = useCallback((datosUsuario) => {
    setUsuario({
      nombre: datosUsuario.nombre,
      email: datosUsuario.mail,
    })
    setLogged(true);
  }, []);

  const onCerrarSesion = useCallback(() => {
    setUsuario({
      nombre: "",
      email: ""
    })
    setLogged(false);
  }, []);

  return (
    <BrowserRouter>
      {/* <ModalProvider signedUpCallback={onRegistrarse} loggedInCallback={onIniciarSesion}></ModalProvider> */}
      <ModalProvider
        onIniciarSesion={onIniciarSesion}
        onRegistrarse={onRegistrarse}
        onCerrarSesion={onCerrarSesion}
      >
        <Navbar isLogged={isLogged} datosUsuario={usuario} logOutCallback={onCerrarSesion} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<LandingPage />} />
          <Route path="/contact-us" element={<LandingPage />} />
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
    <div className="justify-center text-center mt-12">
      <h1 className="text-7xl py-[20%]">404</h1>
    </div>
  );
}
