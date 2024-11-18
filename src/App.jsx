import React, { useState, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import ParticipantesPage from "./pages/ParticipantesPage";
import ProyectosPage from "./pages/ProyectosPage";
import { LandingPage } from "./pages/LandingPage";
import { ModalProvider } from "./components/ModalsHandler";
import { ChangeUserPassPage } from "./pages/ChangeUserPassPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { EditUserProfile } from "./pages/EditUserProfile";
import { EditProjects } from "./pages/EditProjects";
import { RecuperarPassPage } from "./pages/RecuperarPassPage";

import "./globals.css";

export default function App() {
  const [isLogged, setLogged] = useState(Cookies.get("usuario_token")?true:false);
  const [tokenSesion, setTokenSesion] = useState(Cookies.get("usuario_token"));

  const [usuario, setUsuario] = useState({
    nombre: Cookies.get("usuario_nombre"),
    imagen: localStorage.getItem('usuario_imagen'),
  });

  const onIniciarSesion = useCallback((datosUsuario,token) => {
    setTokenSesion(token)
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })

    Cookies.set('usuario_nombre', datosUsuario.nombre);
    Cookies.set('usuario_token', token);
    localStorage.setItem('usuario_imagen', datosUsuario.imagen);

    setLogged(true);
  }, []);
  
  const onRegistrarse = useCallback((datosUsuario,token) => {
    setTokenSesion(token)
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })

    Cookies.set('usuario_nombre', datosUsuario.nombre);
    Cookies.set('usuario_token', token);
    localStorage.setItem('usuario_imagen', datosUsuario.imagen);

    setLogged(true);
  }, []);

  const onEditUserProfile = useCallback((datosUsuario) => {
    setUsuario({
      nombre: datosUsuario.nombre,
      imagen: datosUsuario.imagen,
    })

    Cookies.set('usuario_nombre', datosUsuario.nombre);
    localStorage.setItem('usuario_imagen', datosUsuario.imagen);
  }, []);

  const onCerrarSesion = useCallback(() => {
    setTokenSesion("")
    setUsuario({
      nombre: "",
      imagen: "",
    })

    Cookies.set('usuario_nombre', "");
    Cookies.set('usuario_token', "");
    localStorage.setItem('usuario_imagen', "");

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
              <Route path="/" element={<LandingPage isLogged={isLogged} />} />
              <Route path="/contactanos" element={<LandingPage isLogged={isLogged} />} />
              <Route path="/participantes" element={<ParticipantesPage />} />
              <Route path="/proyectos" element={<ProyectosPage />} />
              <Route path="/editar-perfil" element={<EditUserProfile tokenSesion={tokenSesion} onEditUserProfile={onEditUserProfile}/>} />
              <Route path="/editar-perfil/clave" element={<ChangeUserPassPage tokenSesion={tokenSesion}/>} />
              <Route path="/editar-proyectos" element={<EditProjects />} />
              <Route path="/recuperar-contra" element={<RecuperarPassPage />} />
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
