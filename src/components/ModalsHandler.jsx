import React, { useState, createContext, useContext } from "react";
import RegistrationModal from "./RegistrationModal.jsx";
import LoginModal from "./LoginModal.jsx";
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({
  children,
  onIniciarSesion,
  onRegistrarse,
  onCerrarSesion,
}) {
  const [modalState, setModalState] = useState({
    isRegistrationOpen: false,
    isLoginOpen: false,
  });

  const toggleModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const toggleRegistration = () => toggleModal("isRegistrationOpen");
  const toggleLogin = () => toggleModal("isLoginOpen");

  return (
    <ModalContext.Provider
      value={{
        modalState,
        toggleRegistration,
        toggleLogin,
        onIniciarSesion,
        onRegistrarse,
        onCerrarSesion,
      }}
    >
      {children}
      <ModalsHandler />
    </ModalContext.Provider>
  );
}

function ModalsHandler() {
  const {
    modalState,
    toggleRegistration,
    toggleLogin,
    onIniciarSesion,
    onRegistrarse,
  } = useModal();

  return (
    <>
      {modalState.isRegistrationOpen && (
        <RegistrationModal
          signedUpCallback={onRegistrarse}
          onClose={toggleRegistration}
        />
      )}
      {modalState.isLoginOpen && (
        <LoginModal loggedInCallback={onIniciarSesion} onClose={toggleLogin} />
      )}
    </>
  );
}

export default ModalsHandler;
