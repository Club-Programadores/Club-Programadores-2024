import ProjectBox from "@/components/project/ProjectBox";
import StatesDropdown from "@/components/filtersDropdown/StatesDropdown";
import ProjectsController from "@/services/dbService/projects/projectsController";
import Proyectos2023json from "../../assets/proyectos_2023.json";
import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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

export const ProjectsPage = ({ tokenSesion }) => {
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(false);
  const [projects, setProjects] = useState([])
  const [projectsFetched, setProjectsFetched] = useState(false)
  const [joinProjectRequest, setJoinProjectRequest] = useState({
    requested: false,
    projectId: -1
  })

  useEffect(() => {
    async function getProjects() {
      const result = await ProjectsController.asyncGetProjects();
      if (result.successful) {
        setProjects(result.data.projects);
      }
      else {
        alert(result.details)
      }
    }

    async function joinProject() {
      const result = await ProjectsController.asyncJoinProject(tokenSesion,joinProjectRequest.projectId);

      if (result.successful) {
        alert("Se sumó exitosamente al proyecto.")
      }
      else {
        alert(result.details)
      }

      setJoinProjectRequest({
        requested: false,
        projectId: -1
      })
    }

    if (joinProjectRequest.requested) {
      joinProject()
    }

    if(!projectsFetched){
      getProjects();
      setProjectsFetched(true);
    }
  }, [joinProjectRequest])

  const filteredProjects = (rawProjects) => {
    let result = rawProjects;

    if (search !== "") {
      result = result.filter((proyecto) =>
        proyecto.titulo.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    if (filterState.length !== 0) {
      result = result.filter((proyecto) =>
        filterState.some(
          (estado) =>
            estado.value.toLowerCase() === proyecto.estado.toLowerCase()
        )
      );
    }

    return result;
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
              <StatesDropdown setStatesFilter={setFilterState} />
            </div>
          )}
        </CardContent>
      </Card>
      {
      !projects?<></>:
      <>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredProjects(projects).map((projects) => (
            <motion.div key={projects.id} variants={item} className="mb-6">
              <ProjectBox data={projects} onJoinCallback={()=>{
                setJoinProjectRequest({
                  requested: true,
                  projectId: projects.id
                })
              }} />
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredProjects(Proyectos2023json.proyectos).map((project) => (
            <motion.div key={project.id} variants={item} className="mb-6">
              <ProjectBox data={project} onJoinCallback={()=>{
                setJoinProjectRequest({
                  requested: true,
                  projectId: project.id
                })
              }} />
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
      </>
      }
    </div>
  );
}
