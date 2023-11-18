

import '../base/ProyectoBoxStyles.css'
import './proyectoEnDesarrolloBoxStyles.css'

export default function ProyectoEnDesarrolloBox(proyecto){
    return (
        <div className="proyectoBox proyectoEnDesarrollo">
            <h1>{proyecto.data.titulo}</h1>
        </div>
    )
}