import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import ParticipanteBox from "@/components/ParticipanteBox"
import PerfilesDropdown from "@/components/FiltersDropdown/PerfilesDropdown";
import TechnologyDropdown from "@/components/FiltersDropdown/TechnologyDropdown";
import ParticipantesController from "@/dbService/participantes/participantesController"
import UserProfileModal from "@/components/UserProfileModal";

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

export default function ParticipantesPage() {
  const [search, setSearch] = useState("");
  const [profilesFilter, setProfilesFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [participantes, setParticipantes] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>{
    async function getData(){
      let participantes;
      try{
        participantes = await ParticipantesController.asyncGetAllParticipantes();        
      }
      catch(e){
        console.log(e)
      }
      setParticipantes(participantes);
    }
    getData();
  },[])

  const filteredParticipantes = () => {
    let res = participantes;
    if (search !== "") {
      res = res.filter((participante) =>
        participante.nombre.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    if (profilesFilter.length !== 0) {
      res = res.filter((participante) =>
        profilesFilter.every((profile) =>
          participante.profiles.some((p) =>
            p.toLowerCase().includes(profile.value.toLowerCase())
          )
        )
      );
    }
    if (technologyFilter.length !== 0) {
      res = res.filter((participante) =>
        technologyFilter.every((technology) =>
          participante.technology.some((tech) =>
            tech.toLowerCase().includes(technology.value.toLowerCase())
          )
        )
      );
    }
    return res
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
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
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filteredParticipantes().map((participante) => (
          <motion.div
            key={participante.id}
            variants={item}
            onClick={() => handleUserClick(participante)}
          >
            <ParticipanteBox data={participante} />
          </motion.div>
        ))}
      </motion.div>
      <UserProfileModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
}
