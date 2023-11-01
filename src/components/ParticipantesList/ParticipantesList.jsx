import ParticipanteBox from '../ParticipanteBox/ParticipanteBox'
import './ParticipantesList.css'

export default function ParticipantesList(props){
    return (
        <div className='participantesList'>
        {
            props.participantes.map((participante)=>{
                return (
                    <ParticipanteBox data={participante}/>
                )
            })
        }
        </div>
    )
}