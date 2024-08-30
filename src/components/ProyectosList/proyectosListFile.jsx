import { motion } from "framer-motion";
import NuevoProyectoBox from "../ProyectosBoxes/NuevoProyectoBox/NuevoProyectoBoxFile";
import ProyectoEnDesarrolloBox from "../ProyectosBoxes/ProyectoEnDesarrolloBox/proyectoEnDesarrolloBoxFile";
import ProyectoFinalizadoBox from "../ProyectosBoxes/ProyectoFinalizadoBox/ProyectoFinalizadoBoxFile";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function ProyectosList({ proyectos }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {proyectos.map((proyecto) => (
        <motion.div key={proyecto.id} variants={item}>
          {proyecto.estado === "nuevo" && <NuevoProyectoBox data={proyecto} />}
          {proyecto.estado === "en_desarrollo" && (
            <ProyectoEnDesarrolloBox data={proyecto} />
          )}
          {proyecto.estado === "finalizado" && (
            <ProyectoFinalizadoBox data={proyecto} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
