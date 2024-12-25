import "./globals.css";
import Cookies from "js-cookie";

import { useState, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ModalProvider } from "@/components/ModalsHandler";
import { Footer } from "@/components/Footer";
import { LandingPage } from "@/pages/LandingPage";
import { ParticipantsPage } from "@/pages/ParticipantsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { EditUserProfilePage }  from "@/pages/user/EditUserProfilePage";
import { EditUserPasswordPage } from "@/pages/user/EditUserPasswordPage";
import { EditUserProjectsPage } from "@/pages/user/EditUserProjectsPage";
import { RetrieveUserPass_ValidationPage } from "@/pages/user/RetrieveUserPass_ValidationPage";
import { RetrieveUserPass_ChangePasswordPage } from "@/pages/user/RetrieveUserPass_ChangePassPage";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("user_token")?true:false);
  const [tokenSesion, setTokenSesion] = useState(Cookies.get("user_token"));

  const [user, setUser] = useState({
    name: Cookies.get("user_name"),
    image: localStorage.getItem('user_image'),
  });

  const logInCallback = useCallback((userData,token) => {
    setTokenSesion(token)
    setUser({
      name: userData.name,
      image: userData.image,
    })

    Cookies.set('user_name', userData.name);
    Cookies.set('user_token', token);
    localStorage.setItem('user_image', userData.image);

    setIsLoggedIn(true);
  }, []);
  
  const signInCallback = useCallback((userData,token) => {
    setTokenSesion(token)
    setUser({
      name: userData.name,
      image: userData.image,
    })

    Cookies.set('user_name', userData.nombr);
    Cookies.set('user_token', token);
    localStorage.setItem('user_image', userData.image);

    setIsLoggedIn(true);
  }, []);

  const editUserProfileCallback = useCallback((userData) => {
    setUser({
      name: userData.name,
      image: userData.image,
    })

    Cookies.set('user_name', userData.name);
    localStorage.setItem('user_image', userData.image);
  }, []);

  const logOutCallback = useCallback(() => {
    setTokenSesion("")
    setUser({
      name: "",
      image: "",
    })

    Cookies.set('user_name', "");
    Cookies.set('user_token', "");
    localStorage.setItem('user_image', "");

    setIsLoggedIn(false);
    window.location.href = "http://club-desarrolladores.site/";
  }, []);

  return (
    <BrowserRouter>
      <ModalProvider
        onLogIn={logInCallback}
        onSignIn={signInCallback}
        onLogOut={logOutCallback}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar isLogged={isLoggedIn} userData={user} logOutCallback={logOutCallback} />
          <main className="flex flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage isLogged={isLoggedIn} />} />
              <Route path="/contactanos" element={<LandingPage isLogged={isLoggedIn} />} />
              <Route path="/participantes" element={<ParticipantsPage />} />
              <Route path="/proyectos" element={<ProjectsPage tokenSesion={tokenSesion}/>} />
              <Route path="/editar-perfil" element={<EditUserProfilePage tokenSesion={tokenSesion} onEditUserProfile={editUserProfileCallback}/>} />
              <Route path="/editar-perfil/clave" element={<EditUserPasswordPage tokenSesion={tokenSesion}/>} />
              <Route path="/editar-proyectos" element={<EditUserProjectsPage tokenSesion={tokenSesion}/>} />
              <Route path="/recuperar-contra/validacion" element={<RetrieveUserPass_ValidationPage/>} />
              <Route path="/recuperar-contra/actualizar/:token?" element={<RetrieveUserPass_ChangePasswordPage/>} />
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
