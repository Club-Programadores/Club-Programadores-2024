import Interes from '..//Intereses//interes'

export default function ParticipanteBox(participante){
    return (
        <div className='participanteBox' key={participante.data.id}>
            <div className='profilePic' >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
            </div>
            <div className='participanteInfo'>
                <h1>{participante.data.nombre}</h1>
                <hr/>
                <div className='intereses'>
                    <Interes data='GAMEDEV'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                    <Interes data='BACKEND'></Interes>
                </div>
            </div>
            <div className='iconsContainer'>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
            </div>
        </div>
    )
}