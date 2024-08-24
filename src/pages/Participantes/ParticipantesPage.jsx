import { useState } from "react";
import SearchBar from "../../components/SearchBar/searchBarFile.jsx";
import PerfilesDropdown from "../../components/FiltersDropdown/PerfilesDropdown/PerfilesDropdownFile.jsx";
import TechnologyDropdown from "../../components/FiltersDropdown/TechnologyDropdown/TechnologyDropdown.jsx";
import ParticipantesList from "../../components/ParticipantesList//ParticipantesList";
import participantesJson from "../../../assets/miembros.json";
import ".//ParticipantesStyles.css";

function ParticipantesPage() {
  const [search, setSearch] = useState("");
  const [profilesFilter, setProfilesFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);

  let participantes = JSON.parse(JSON.stringify(participantesJson)).miembros;

  const filteredParticipantes = () => {
    if (search != "") {
      participantes = participantes.filter((participante) =>
        participante.nombre.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    if (profilesFilter.length != 0) {
      participantes = participantes.filter((participante) =>
        profilesFilter.every((profile) =>
          participante.profiles
            .map((i) => i.toLowerCase())
            .includes(profile.label.toLowerCase())
        )
      );
    }
    if (technologyFilter.length != 0) {
      participantes = participantes.filter((participante) =>
        technologyFilter.every((technology) =>
          participante.technology
            .map((i) => i.nombre.toLowerCase())
            .includes(technology.label.toLowerCase())
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
        <PerfilesDropdown
          className="filterDropdown"
          setProfilesFilter={setProfilesFilter}
        />
        <TechnologyDropdown
          className="filterDropdown"
          setTechnologyFilter={setTechnologyFilter}
        />
      </div>
      <ParticipantesList participantes={filteredParticipantes()} />
    </div>
  );
}

export default ParticipantesPage;
