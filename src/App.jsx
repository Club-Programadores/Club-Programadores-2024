import React, { useState, useCallback } from "react";
import { ModalProvider } from "./components/ModalsHandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import ParticipantesPage from "./pages/ParticipantesPage";
import ProyectosPage from "./pages/ProyectosPage";
import { PasswordChange } from "./pages/PasswordChange";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./globals.css";
import { EditUserProfile } from "./pages/EditUserProfile";
import { EditProjects } from "./pages/EditProjects";

export default function App() {
  const [isLogged, setLogged] = useState(false);
  const [tokenSesion, setTokenSesion] = useState('');

  const [usuario, setUsuario] = useState({
    nombre: "",
    imagen: "",
  });

  const onIniciarSesion = useCallback((datosUsuario,token) => {
    setTokenSesion(token)
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })
    setLogged(true);
  }, []);
  
  const onRegistrarse = useCallback((datosUsuario,token) => {
    setTokenSesion(token)
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })
    setLogged(true);
  }, []);

  const onEditUserProfile = useCallback((datosUsuario) => {
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })
  }, []);

  const onCerrarSesion = useCallback(() => {
    setTokenSesion("")
    setUsuario({
      nombre: "",
      imagen: "",
    })
    setLogged(false);
  }, []);

  return (
    <BrowserRouter>
      <ModalProvider
        onIniciarSesion={onIniciarSesion}
        onRegistrarse={onRegistrarse}
        onCerrarSesion={onCerrarSesion}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar isLogged={isLogged} datosUsuario={usuario} logOutCallback={onCerrarSesion} />
          <main className="flex flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contactanos" element={<LandingPage />} />
              <Route path="/participantes" element={<ParticipantesPage />} />
              <Route path="/proyectos" element={<ProyectosPage />} />
              <Route path="/editar-perfil" element={<EditUserProfile tokenSesion={tokenSesion} onEditUserProfile={onEditUserProfile}/>} />
              <Route path="/editar-perfil/clave" element={<PasswordChange />} />
              <Route path="/editar-proyectos" element={<EditProjects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ModalProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <h1 className="text-7xl mb-4">404</h1>
      <h2 className="text-xl">Acá no hay nada...</h2>
    </div>
  );
}
