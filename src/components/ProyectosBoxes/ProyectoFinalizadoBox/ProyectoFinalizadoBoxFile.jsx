
import '../base/ProyectoBoxStyles.css'
import './ProyectoFinalizadoBoxStyles.css'

export default function ProyectoFinalizadoBox(proyecto){
    return (
        <div className="proyectoBox proyectoFinalizado">
            <h1>{proyecto.data.titulo}</h1>
        </div>
    )
}