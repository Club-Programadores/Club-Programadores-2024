import HeroBanner from "..//..//components//HeroBanner//HeroBanner";
import Navbar from "../../components/Navbar/Navbar";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import SignInModal from "../../components/SignInModal/SignInModal";

export default function Home() {
  window.onload = function () {
    switch (window.location.pathname) {
      case "/about-us":
        document.getElementById("about-us").scrollIntoView();
        break;
      case "/contact-us":
        document.getElementById("contact-us").scrollIntoView();
        break;
    }
  };

  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  const toggleSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
  };
  const toggleSignIn = () => {
    setSignInOpen(!isSignInOpen);
  };

  return (
    <>
      <Navbar onSignUpClick={toggleSignUp} onLoginClick={toggleSignIn} />
      {isSignUpOpen && <SignUpModal onClose={toggleSignUp} />}
      {isSignInOpen && <SignInModal onClose={toggleSignIn} />}
      <HeroBanner onSignUpClick={toggleSignUp} />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
