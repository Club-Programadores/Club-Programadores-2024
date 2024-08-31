import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import ParticipantesList from "../components/ParticipantesList/ParticipantesList";
import participantesJson from "../../assets/miembros.json";
import PerfilesDropdown from "@/components/FiltersDropdown/PerfilesDropdown";
import TechnologyDropdown from "@/components/FiltersDropdown/TechnologyDropdown";
import Secrets from "@/../private/secrets.json"

function ParticipantesPage() {
  const [search, setSearch] = useState("");
  const [profilesFilter, setProfilesFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [participantes, setParticipantes] = useState([])

  let tempParticipantes = participantes;

  function usuarios2Participantes(usuariosJson){
    let lista = [];
    usuariosJson.forEach(usuario => {
      let participante = {
        "id":usuario.id,
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "bio":usuario.informacion,
        "imageUrl": usuario.image,
        "profiles":usuario.perfiles,
        "technology": Object.keys(usuario.lenguaje_nivel).map(x => {
          return{
            "nombre": x.toLowerCase(),
            "nivel": 1
          }
        })
      }
      lista.push(participante)
    });
    return lista;
  }

  useEffect(()=>{
    async function getData(){
      const response = await fetch(`${Secrets.ApiUrl}/usuarios`)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const responseData = await response.json();
      const usuarios = responseData.usuarios;
      setParticipantes(usuarios2Participantes(usuarios));
      console.log(usuarios);
    }
    getData();
  },[])

  const filteredParticipantes = () => {
    if (search !== "") {
      tempParticipantes = participantes.filter((participante) =>
        participante.nombre.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    if (profilesFilter.length !== 0) {
      tempParticipantes = participantes.filter((participante) =>
        profilesFilter.every((profile) =>
          participante.profiles
            .map((i) => i.toLowerCase())
            .includes(profile.label.toLowerCase())
        )
      );
    }
    if (technologyFilter.length !== 0) {
      tempParticipantes = participantes.filter((participante) =>
        technologyFilter.every((technology) =>
          participante.technology
            .map((i) => i.nombre.toLowerCase())
            .includes(technology.label.toLowerCase())
        )
      );
    }
    return tempParticipantes;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Participantes</h1>
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Buscar participantes..."
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
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <PerfilesDropdown
                className="filterDropdown"
                setProfilesFilter={setProfilesFilter}
              />
              <TechnologyDropdown
                className="filterDropdown"
                setTechnologyFilter={setTechnologyFilter}
              />
            </div>
          )}
        </CardContent>
      </Card>
      <ParticipantesList participantes={filteredParticipantes()} />
    </div>
  );
}

export default ParticipantesPage;
