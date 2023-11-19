import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'
import InteresesDropdown from '../../components/FiltersDropdown/InteresesDropdown/InteresesDropdownFile.jsx'
import SkillsDropdown from '../../components/FiltersDropdown/SkillsDropdown/SkillsDropdownFile.jsx'
import ParticipantesList from '../../components/ParticipantesList//ParticipantesList'

import participantesJson from '../../../assets/miembros.json'

import './/ParticipantesStyles.css'



function ParticipantesPage() {
  const [search, setSearch] = useState('')
  const [showDropdowns, setShowDropdowns] = useState(false)

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
        <SearchBar setSearch={setSearch} showDropdownsState={showDropdowns} setShowDropdowns={setShowDropdowns}/>
        <div className={showDropdowns? "":"hidden"}>
          <InteresesDropdown/>
          <SkillsDropdown/>
        </div>
        <ParticipantesList participantes={filteredParticipantes()}/>
      </div>
      <Footer />
    </>
  )
}

export default ParticipantesPage;

