import {
  BrowserRouter,
  Route,
  Routes, 
  useLocation
} from "react-router-dom";

import HomePage from './/pages//Home//HomePage'
import ParticipantesPage from './/pages//Participantes//ParticipantesPage'
import ProyectosPage from './/pages//Proyectos//ProyectosPage'

import './App.css'

export default function App() {
  return(
      <BrowserRouter>
        <div>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/about-us" element={<HomePage/>} />
              <Route path="/contact-us" element={<HomePage/>} />
              <Route path="/participantes" element={<ParticipantesPage/>} />
              <Route path="/proyectos" element={<ProyectosPage/>} />

              <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}




function NotFound() {
  return (
    <div>
        <h2>404</h2>
    </div>
  );
}