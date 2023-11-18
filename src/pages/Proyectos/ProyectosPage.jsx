import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProyectosList from '../../components/ProyectosList/proyectosListFile.jsx'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'

import "./ProyectosStyles.css"

function ProyectosPage() {
  const [search, setSearch] = useState('')

  const proyectosArray = [
    {id:1, titulo:'Proyecto 1', estado:'nuevo'},
    {id:2, titulo:'Proyecto 2', estado:'finalizado'},
    {id:3, titulo:'Proyecto 3', estado:'en_desarrollo'},
    {id:4, titulo:'Proyecto 4', estado:'nuevo'}
  ]

  const filteredProyectos = () =>{
    if(search == ''){
      return proyectosArray; 
    }
    return proyectosArray.filter(x => x.titulo.toLowerCase().startsWith(search.toLowerCase()))
  }

  return (
    <>
      <Navbar/>
      <div className='listContainer'>
        <SearchBar setSearch={setSearch}/>
        <ProyectosList proyectos={filteredProyectos()}/>
      </div>
      <Footer />
    </>
  )
}

export default ProyectosPage;
