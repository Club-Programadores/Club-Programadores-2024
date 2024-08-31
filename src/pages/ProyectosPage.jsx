import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import ProyectosList from "../components/ProyectosList/proyectosListFile";
import EstadosDropdown from "../components/FiltersDropdown/EstadoDropdown";
import ProyectosJson from "../../assets/proyectos.json";

function ProyectosPage() {
  const [search, setSearch] = useState("");
  const [estadosFilter, setEstadosFilter] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);

  let proyectos = JSON.parse(JSON.stringify(ProyectosJson)).proyectos;

  const filteredProyectos = () => {
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
      <ProyectosList proyectos={filteredProyectos()} />
    </div>
  );
}

export default ProyectosPage;
