import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import ParticipantesList from '../../components/ParticipantesList//ParticipantesList'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'

import './/ParticipantesStyles.css'

function ParticipantesPage() {
  const [search, setSearch] = useState('')

  const participantesArray = [
    {id:2, nombre:'Maite'},
    {id:3, nombre:'Veronica'},
    {id:4, nombre:'Mike'},
    {id:1, nombre:'Bautista'}
  ]

  const filteredParticipantes = () =>{
    if(search == ''){
      return participantesArray; 
    }
    return participantesArray.filter(x => x.nombre.toLowerCase().startsWith(search.toLowerCase()))
  }

  return (
    <>
      <Navbar/>
      <div className='listContainer'>
        <SearchBar setSearch={setSearch}/>
        <ParticipantesList participantes={filteredParticipantes()}/>
      </div>
    </>
  )
}

export default ParticipantesPage;
