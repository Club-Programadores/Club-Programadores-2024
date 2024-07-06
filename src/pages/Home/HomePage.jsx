import HeroBanner from "..//..//components//HeroBanner//HeroBanner";
import { HomePageNavbar } from "../../components/Navbar/Navbar";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import SignUpModal from "../../components/SignUpModal/SignUpModal";

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

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <HomePageNavbar onSignUpClick={toggleModal} />
      {isModalOpen && <SignUpModal onClose={toggleModal} />}
      <HeroBanner onSignUpClick={toggleModal} />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
