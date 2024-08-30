import React, { useState, createContext, useContext } from "react";
import SignInModal from "./SignInModal/SignInModal";
import SignUpAModal from "./SignUpModal/SignUpAModal";
import SignUpBModal from "./SignUpModal/SignUpBModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({signedUpCallback, loggedInCallback, children }) {
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

  const handleNext = (e) => {
    toggleSignUpA();
    toggleSignUpB(e);
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
      <ModalsHandler onSignedUp={signedUpCallback} onLogueado={loggedInCallback} />
    </ModalContext.Provider>
  );
}

function ModalsHandler({onSignedUp, onLogueado}) {
  const {
    modalState,
    toggleSignUpA,
    toggleSignUpB,
    toggleSignIn,
    LoginRedirect,
    handleNext,
    handleBack,
  } = useModal();

  const [userData, setUserData] = useState({
    email: "",
    pass: ""
  });

  return (
    <>
      {modalState.isSignUpAOpen && (
        <SignUpAModal
          onClose={toggleSignUpA}
          handleNext={e => {
            console.log(e)
            setUserData({
              email: e.email,
              pass: e.pass,
            });
            handleNext();
          }}
          handleLoginRedirect={LoginRedirect}
        />
      )}
      {modalState.isSignUpBOpen && (
        <SignUpBModal userData={userData} signedUpCallback={onSignedUp} onClose={toggleSignUpB} handleBack={handleBack} />
      )}
      {modalState.isSignInOpen && <SignInModal loggedInCallback={onLogueado} onClose={toggleSignIn} />}
    </>
  );
}

export default ModalsHandler;
