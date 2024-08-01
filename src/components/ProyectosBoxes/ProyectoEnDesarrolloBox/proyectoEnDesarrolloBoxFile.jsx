import SkillBox from "../../Intereses/interes";
import "../base/ProyectoBoxStyles.css";
import "./proyectoEnDesarrolloBoxStyles.css";

export default function ProyectoEnDesarrolloBox(proyecto) {
  return (
    <div className="proyectoBox proyectoEnDesarrollo">
      <div className="info">
        <h1>{proyecto.data.titulo}</h1>
        <p>{proyecto.data.descripcion}</p>
      </div>
      <div className="right">
        <a href={proyecto.data.url_proyecto}>
          <button type="button" className="btn btn-dark">
            PROYECTO
          </button>
        </a>
      </div>
    </div>
  );
}
