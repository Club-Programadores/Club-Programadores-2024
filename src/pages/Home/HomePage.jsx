import React, { useState } from "react";
import HeroBanner from "..//..//components//HeroBanner//HeroBanner";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <About />
      <Contact />
    </>
  );
}
