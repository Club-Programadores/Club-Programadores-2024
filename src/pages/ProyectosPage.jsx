import { useState } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import ProyectoBox from "@/components/ProyectoBox";
import EstadosDropdown from "@/components/FiltersDropdown/EstadoDropdown";
import ProyectosJson from "../../assets/proyectos.json";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
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

export default function ProyectosPage() {
  const [search, setSearch] = useState("");
  const [estadosFilter, setEstadosFilter] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);

  const filteredProyectos = () => {
    let proyectos = [...ProyectosJson.proyectos];

    if (search !== "") {
      proyectos = proyectos.filter((proyecto) =>
        proyecto.titulo.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    if (estadosFilter.length !== 0) {
      proyectos = proyectos.filter((proyecto) =>
        estadosFilter.some(
          (estado) =>
            estado.value.toLowerCase() === proyecto.estado.toLowerCase()
        )
      );
    }
    return proyectos;
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Proyectos</h1>
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Buscar proyectos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Button
              onClick={() => setShowDropdowns(!showDropdowns)}
              variant="outline"
              className="flex items-center justify-center"
            >
              Filtros
              {showDropdowns ? (
                <ChevronUp className="ml-2" size={20} />
              ) : (
                <ChevronDown className="ml-2" size={20} />
              )}
            </Button>
          </div>
          {showDropdowns && (
            <div className="mt-4">
              <EstadosDropdown setEstadosFilter={setEstadosFilter} />
            </div>
          )}
        </CardContent>
      </Card>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredProyectos().map((proyecto) => (
            <motion.div key={proyecto.id} variants={item} className="mb-6">
              <ProyectoBox data={proyecto} />
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </div>
  );
}
