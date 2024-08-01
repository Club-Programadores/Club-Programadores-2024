import { ModalProvider } from "./components/ModalsHandler";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from ".//pages//Home//HomePage";
import ParticipantesPage from ".//pages//Participantes//ParticipantesPage";
import ProyectosPage from ".//pages//Proyectos//ProyectosPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<HomePage />} />
          <Route path="/contact-us" element={<HomePage />} />
          <Route path="/participantes" element={<ParticipantesPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ModalProvider>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div>
      <hB>404</hB>
    </div>
  );
}
