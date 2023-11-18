
import '../base/ProyectoBoxStyles.css'
import './NuevoProyectoBoxStyles.css'

export default function NuevoProyectoBox(proyecto){
    return (
        <div className="proyectoBox nuevoProyeto">
            <h1>{proyecto.data.titulo}</h1>
        </div>
    )
}