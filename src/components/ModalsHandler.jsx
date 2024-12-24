import LoginModal from "./LoginModal.jsx";
import RegistrationModal from "./RegistrationModal.jsx";
import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({
  children,
  onLogIn,
  onSignIn,
  onLogOut,
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
        onLogIn,
        onSignIn,
        onLogOut,
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
    onLogIn,
    onSignIn,
  } = useModal();

  return (
    <>
      {modalState.isRegistrationOpen && (
        <RegistrationModal
          signedUpCallback={onSignIn}
          onClose={toggleRegistration}
        />
      )}
      {modalState.isLoginOpen && (
        <LoginModal loggedInCallback={onLogIn} onClose={toggleLogin} />
      )}
    </>
  );
}

export default ModalsHandler;
