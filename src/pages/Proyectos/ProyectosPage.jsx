import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProyectosList from '../../components/ProyectosList/proyectosListFile.jsx'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'
import EstadosDropdown from '../../components/FiltersDropdown/EstadoProyectosDropdown/EstadoProyectoDropdownFile.jsx'
import SignUpModal from '../../components/SignUpModal/SignUpModal'

import ProyectosJson from '../../../assets/proyetos.json'

import "./ProyectosStyles.css"

function ProyectosPage() {
  const [search, setSearch] = useState('')
  const [estadosFilter, setEstadosFilter] = useState([])
  const [showDropdowns, setShowDropdowns] = useState(false)

  let proyectos = JSON.parse(JSON.stringify(ProyectosJson)).proyectos;

  const filteredProyectos = () =>{
    if(search != ''){
      proyectos = proyectos.filter(proyecto => proyecto.titulo.toLowerCase().startsWith(search.toLowerCase()) )
    }
    
    if(estadosFilter.length != 0){
      proyectos = proyectos.filter(proyecto => estadosFilter.some(estado => estado.value.toLowerCase() == proyecto.estado.toLowerCase()))
    }
    return proyectos;
  }

  const [isModalOpen, setModalOpen] = useState(false);
    
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar onSignUpClick={toggleModal}/>
      {isModalOpen && <SignUpModal onClose={toggleModal}/>}
      <div className='listContainer'>
        <SearchBar setSearch={setSearch} showDropdownsState={showDropdowns} setShowDropdowns={setShowDropdowns}/>
        <div className={showDropdowns? "filter":"filter hidden"}>
          <EstadosDropdown setEstadosFilter={setEstadosFilter}/>
        </div>
        <ProyectosList proyectos={filteredProyectos()}/>
      </div>
      <Footer />
    </>
  )
}

export default ProyectosPage;
