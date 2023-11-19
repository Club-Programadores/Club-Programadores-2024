import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ParticipantesList from '../../components/ParticipantesList//ParticipantesList'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'

import './/ParticipantesStyles.css'

import participantesJson from '../../../assets/miembros.json'

function ParticipantesPage() {
  const [search, setSearch] = useState('')

  const participantes = JSON.parse(JSON.stringify(participantesJson)).miembros;

  const filteredParticipantes = () =>{
    if(search == ''){
      return participantes; 
    }
    return participantes.filter(x => x.nombre.toLowerCase().startsWith(search.toLowerCase()))
  }

  return (
    <>
      <Navbar/>
      <div className='listContainer'>
        <SearchBar setSearch={setSearch}/>
        <ParticipantesList participantes={filteredParticipantes()}/>
      </div>
      <Footer />
    </>
  )
}

export default ParticipantesPage;

