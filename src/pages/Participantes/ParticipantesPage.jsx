import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/searchBarFile.jsx";
import InteresesDropdown from "../../components/FiltersDropdown/InteresesDropdown/InteresesDropdownFile.jsx";
import SkillsDropdown from "../../components/FiltersDropdown/SkillsDropdown/SkillsDropdownFile.jsx";
import ParticipantesList from "../../components/ParticipantesList//ParticipantesList";
import ".//ParticipantesStyles.css";

function ParticipantesPage() {
  const [search, setSearch] = useState("");
  const [interesesFilter, setInteresesFilter] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState([]);
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
        "intereses":usuario.perfiles,
        "skills": Object.keys(usuario.lenguaje_nivel).map(x => {
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
      const response = await fetch("http://127.0.0.1:5000/usuarios")
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const responseData = await response.json();
      const usuarios = responseData.usuarios;
      setParticipantes(usuarios2Participantes(usuarios));
    }
    getData();
  },[])
  
  const filteredParticipantes = () => {
    if (search != "") {
      setParticipantes(participantes.filter((participante) =>
        participante.nombre.toLowerCase().startsWith(search.toLowerCase())
      ));
    }
    if (interesesFilter.length != 0) {
      participantes = participantes.filter((participante) =>
        interesesFilter.every((interes) =>
          participante.intereses
            .map((i) => i.toLowerCase())
            .includes(interes.label.toLowerCase())
        )
      );
    }
    if (skillsFilter.length != 0) {
      participantes = participantes.filter((participante) =>
        skillsFilter.every((skill) =>
          participante.skills
            .map((i) => i.nombre.toLowerCase())
            .includes(skill.label.toLowerCase())
        )
      );
    }
    return participantes;
  };

  return (
    <div className="listContainer">
      <SearchBar
        setSearch={setSearch}
        showDropdownsState={showDropdowns}
        setShowDropdowns={setShowDropdowns}
      />
      <div className={showDropdowns ? "filter container-sm" : "hidden"}>
        <InteresesDropdown
          className="filterDropdown"
          setInteresesFilter={setInteresesFilter}
        />
        <SkillsDropdown
          className="filterDropdown"
          setSkillsFilter={setSkillsFilter}
        />
      </div>
      <ParticipantesList participantes={filteredParticipantes()} />
    </div>
  );
}

export default ParticipantesPage;
