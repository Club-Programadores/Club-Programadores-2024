import Interes from '..//Intereses//interes'

import './ParticipanteBoxStyles.css'

export default function ParticipanteBox(participante){
    return (
        <div className='participanteBox' key={participante.data.id}>
            <div className='profilePic' >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
            </div>
            <div className='participanteInfo'>
                <h1>{participante.data.nombre}</h1>
                <div className='intereses'>
                    <h3>Intereses:</h3>
                    <Interes data='GAMEDEV'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                </div>
            </div>
            <div>
                <h3 style={{fontSize:'20px', margin:'0px'}}>SKILLS</h3>
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
}