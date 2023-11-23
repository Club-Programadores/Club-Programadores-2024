
import NuevoProyectoBox from '../ProyectosBoxes//NuevoProyectoBox//NuevoProyectoBoxFile'
import ProyectoEnDesarrolloBox from '../ProyectosBoxes/ProyectoEnDesarrolloBox/proyectoEnDesarrolloBoxFile'
import ProyectoFinalizadoBox from '../ProyectosBoxes//ProyectoFinalizadoBox//ProyectoFinalizadoBoxFile'

import './proyectosListStyles.css'

export default function ProyectosList(props){
    return(
        <div className="proyectosList">
        {
            props.proyectos.map((proyecto)=>{
                switch(proyecto.estado){
                    case 'nuevo':
                        return (
                            <NuevoProyectoBox key={proyecto.id} data={proyecto}/>
                        )
                    case 'en_desarrollo':
                        return (
                            <ProyectoEnDesarrolloBox key={proyecto.id} data={proyecto}/>
                        )
                    case 'finalizado':
                        return (
                            <ProyectoFinalizadoBox key={proyecto.id} data={proyecto}/>
                        )
                }
            })
        }
        </div>
    )
}