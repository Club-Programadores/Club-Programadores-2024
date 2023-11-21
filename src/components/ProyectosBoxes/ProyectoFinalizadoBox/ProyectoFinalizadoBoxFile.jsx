
import '../base/ProyectoBoxStyles.css'
import './ProyectoFinalizadoBoxStyles.css'

export default function ProyectoFinalizadoBox(proyecto){
    return (
        <div className="proyectoBox proyectoFinalizado">
            <div className='info'>
                <h1>{proyecto.data.titulo}</h1>
                <p>{proyecto.data.descripcion}</p>
            </div>
            <div className='right'>
                <a href={proyecto.data.url_pagina}>
                    <button type="button" className="btn btn-primary">
                        PAGINA
                    </button>
                </a>
                <a href={proyecto.data.url_proyecto}>
                    <button type="button" className="btn btn-dark">
                        PROYECTO
                    </button>
                </a>
            </div>
        </div>
    )
}