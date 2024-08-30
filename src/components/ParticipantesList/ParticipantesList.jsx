import ParticipanteBox from "../ParticipanteBox/ParticipanteBox";
import { motion } from "framer-motion";

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

function ParticipantesList({ participantes }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {participantes.map((participante) => (
        <motion.div key={participante.id} variants={item}>
          <ParticipanteBox data={participante} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ParticipantesList;
