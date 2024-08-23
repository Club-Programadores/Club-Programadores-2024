import React, { useState, createContext, useContext } from "react";
import RegistrationModal from "./SignUpModal/RegistrationModal.jsx";
import SignInModal from "./SignInModal/SignInModal.jsx";

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
    isSignInOpen: false,
  });

  const toggleModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const toggleRegistration = () => toggleModal("isRegistrationOpen");
  const toggleSignIn = () => toggleModal("isSignInOpen");

  return (
    <ModalContext.Provider
      value={{
        modalState,
        toggleRegistration,
        toggleSignIn,
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
    toggleSignIn,
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
      {modalState.isSignInOpen && (
        <SignInModal
          loggedInCallback={onIniciarSesion}
          onClose={toggleSignIn}
        />
      )}
    </>
  );
}

export default ModalsHandler;
