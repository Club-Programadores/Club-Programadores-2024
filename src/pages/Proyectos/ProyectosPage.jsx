import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProyectosList from '../../components/ProyectosList/proyectosListFile.jsx'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'
import EstadosDropdown from '../../components/FiltersDropdown/EstadoProyectosDropdown/EstadoProyectoDropdownFile.jsx'

import ProyectosJson from '../../../assets/proyetos.json'

import "./ProyectosStyles.css"

function ProyectosPage() {
  const [search, setSearch] = useState('')
  const [showDropdowns, setShowDropdowns] = useState(false)

  const proyectos = JSON.parse(JSON.stringify(ProyectosJson)).proyectos;

  const filteredProyectos = () =>{
    if(search == ''){
      return proyectos; 
    }
    return proyectos.filter(x => x.titulo.toLowerCase().startsWith(search.toLowerCase()))
  }

  return (
    <>
      <Navbar/>
      <div className='listContainer'>
        <SearchBar setSearch={setSearch} showDropdownsState={showDropdowns} setShowDropdowns={setShowDropdowns}/>
        <div className={showDropdowns? "":"hidden"}>
          <EstadosDropdown/>
        </div>
        <ProyectosList proyectos={filteredProyectos()}/>
      </div>
      <Footer />
    </>
  )
}

export default ProyectosPage;
