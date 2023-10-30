import './ParticipantesList.css'

export default function ParticipantesList(props){
    return (
        <div className='participantesList'>
        {
            props.participantes.map((participante)=>{
                return (
                    <div className='participanteBox' key={participante.id}>
                        <div className='left'>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                            <h1>{participante.nombre}</h1>
                        </div>
                        <div className='middle'></div>
                        <div className='right'>
                            <div className='iconsContainer'>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}