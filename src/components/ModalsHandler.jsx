import React, { useState, createContext, useContext } from "react";
import SignInModal from "./SignInModal/SignInModal";
import SignUpAModal from "./SignUpModal/SignUpAModal";
import SignUpBModal from "./SignUpModal/SignUpBModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isSignUpAOpen: false,
    isSignUpBOpen: false,
    isSignInOpen: false,
  });

  const toggleModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const toggleSignUpA = () => toggleModal("isSignUpAOpen");
  const toggleSignUpB = () => toggleModal("isSignUpBOpen");
  const toggleSignIn = () => toggleModal("isSignInOpen");

  const LoginRedirect = () => {
    toggleSignUpA();
    toggleSignIn();
  };

  const handleNext = () => {
    toggleSignUpA();
    toggleSignUpB();
  };

  const handleBack = () => {
    toggleSignUpB();
    toggleSignUpA();
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        toggleSignUpA,
        toggleSignUpB,
        toggleSignIn,
        LoginRedirect,
        handleNext,
        handleBack,
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
    toggleSignUpA,
    toggleSignUpB,
    toggleSignIn,
    LoginRedirect,
    handleNext,
    handleBack,
  } = useModal();

  return (
    <>
      {modalState.isSignUpAOpen && (
        <SignUpAModal
          onClose={toggleSignUpA}
          handleNext={handleNext}
          handleLoginRedirect={LoginRedirect}
        />
      )}
      {modalState.isSignUpBOpen && (
        <SignUpBModal onClose={toggleSignUpB} handleBack={handleBack} />
      )}
      {modalState.isSignInOpen && <SignInModal onClose={toggleSignIn} />}
    </>
  );
}

export default ModalsHandler;
