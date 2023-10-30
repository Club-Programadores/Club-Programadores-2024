import Navbar from '../../components/Navbar/Navbar'
import ParticipantesList from '../../components/ParticipantesList//ParticipantesList'
import './/ParticipantesStyles.css'

function ParticipantesPage() {
  const participantesArray = [
    {id:2, nombre:'Maite'},
    {id:3, nombre:'Veronica'},
    {id:4, nombre:'Mike'},
    {id:1, nombre:'Bautista'}
]

  return (
    <>
      <Navbar/>
      <div className='listContainer'>
        <ParticipantesList participantes={participantesArray}/>
      </div>
    </>
  )
}

export default ParticipantesPage;
