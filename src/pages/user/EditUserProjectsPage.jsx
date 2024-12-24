import * as Yup from "yup";
import ReactSelect from "react-select";
import aptitudesJson from "../../../assets/aptitudes.json";
import ProjectsController from "@/services/dbService/projects/projectsController";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { projectValidation } from "@/validationSchema";
import { AddProjectModal } from "../../components/project/addProjectModal";
import { Save, Trash2, UserPlus, Shield, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card,CardContent,CardHeader,CardTitle,CardDescription} from "@/components/ui/card";
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion";
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarLoader } from "react-spinners";

export const EditUserProjectsPage = ({ tokenSesion, user }) => {
  const { technologyOptions } = aptitudesJson;
  const loadingProjectsTimeOut = 100000;
  const loadingCSSOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(true);
  const [loadingColor, setLoadingColor] = useState("#9333ea")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState({
    fetched: false,
    list: []
  });

  const [removeParticipantRequest, setRemoveParticipantRequest] = useState({
    requested: false,
    projectId: -1,
    participantId: -1
  });
  const [participantRolChangeRequest, setParticipantRolChangeRequest] = useState({
    requested: false,
    projectId: -1,
    participantId: -1,
    changeToAdmin: false
  });
  const [saveProjectRequest, setSaveProjectRequest] = useState({
    requested: false,
    project: null
  });
  const [deleteProjectRequest, setDeleteProjectRequest] = useState({
    requested: false,
    projectId: -1
  });


  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  const handleAddProject = (newProject) => {
    location.reload(); //Recargar pagina para que se muestre el nuevo proyecto
    setIsAddModalOpen(false);
  };


  const handleRemoveParticipantButton = (project, participant) => {
    setRemoveParticipantRequest({
      requested: true,
      projectId: project.id,
      participantId: participant.id
    });
  };

  const handleAdminButton = (project, participant) => {
    setParticipantRolChangeRequest({
      requested: true,
      projectId: project.id,
      participantId: participant.id,
      changeToAdmin: participant.admin == 0 ? true : false
    });
  };


  const handleSaveProjectButton = (project) => {
    setSaveProjectRequest({
      requested: true,
      project: project
    });
  };

  const handleDeleteProjectButton = (project) => {
    setDeleteProjectRequest({
      requested: true,
      projectId: project.id
    });
  };


  useEffect(() => {
    async function getAdminProjects(apiResponseTimeout) {
      let projects = [];
      const result = await ProjectsController.asyncGetAdminProjects(tokenSesion);
      
      setLoading(false);
      clearTimeout(apiResponseTimeout)

      if (result.successful) {
        projects = result.data.projects;
      }
      else {
        alert(result.details)
      }

      // Reset Request
      setProjects({
        fetched: true,
        list: projects
      });
    }

    async function removeParticipantFromProject() {
      const result = await ProjectsController.asyncRemoveParticipantFromProject(tokenSesion, removeParticipantRequest.projectId, removeParticipantRequest.participantId);

      if (result.successful) {
        console.log("Usuario echado exitosamente.")
      }
      else {
        alert(result.details)
      }

      // Reset Request
      setRemoveParticipantRequest({
        requested: false,
        projectId: -1,
        participantId: -1
      });
    }

    async function changeParticipantRol() {
        if (participantRolChangeRequest.changeToAdmin) {
          const result = await ProjectsController.asyncAddAdminToProject(tokenSesion, participantRolChangeRequest.projectId, participantRolChangeRequest.participantId);

          if (result.successful) {
            alert(`Usuario ${participantRolChangeRequest.participantId} es ahora admin.`)
          }
          else {
            alert(result.details)
          }
        }
        else {
          const result = await ProjectsController.asyncRemoveAdminFromProject(tokenSesion, participantRolChangeRequest.projectId, participantRolChangeRequest.participantId);
          
          if (result.successful) {
            alert(`Usuario ${participantRolChangeRequest.participantId} ya no es admin.`)
          }
          else {
            alert(result.details)
          }
        }

        //Update participant rol in the front.
        setProjects({
          fetched: true,
          list: projects.list.map(project => {
            if (project.id == participantRolChangeRequest.projectId) {
              const indexParticipant = project.participantes.findIndex(participante => participante.id == participantRolChangeRequest.participantId);
              const isAdmin = project.participantes[indexParticipant].admin;
              project.participantes[indexParticipant].admin = !isAdmin;
            }
            return project;
          })
        })

        // Reset Request
        setParticipantRolChangeRequest({
          requested: false,
          projectId: -1,
          participantId: -1,
          changeToAdmin: false
        });
    }

    async function saveProject() {
      const result = await ProjectsController.asyncEditProject(tokenSesion, saveProjectRequest.project);

      if (result.successful) {
        alert("Proyecto actualizado exitosamente.")
      }
      else {
        alert(result.details)
      }

      // Reset Request
      setSaveProjectRequest({
        requested: false,
        project: null
      })
    }

    async function deleteProject() {
      const result = await ProjectsController.asyncDeleteProject(tokenSesion, deleteProjectRequest.projectId);

      if (result.successful) {
        alert("Proyecto borrado exitosamente.")
        setProjects({
          fetched: true,
          list: projects.list.filter(x => x.id == deleteProjectRequest.projectId)
        })
      }
      else {
        alert(result.details)
      }

      // Reset Request.
      setDeleteProjectRequest({
        requested: false,
        projectId: -1
      });

      //Reload page to update projects list.
      location.reload(); 
    }

    if (!projects.fetched) {
      // Start Loading Bar
      setLoading(true)
      const apiResponseTimeout = setTimeout(() => {
        alert("Error: Timeout Crear Proyecto!")
        setLoading(false)
      }, loadingProjectsTimeOut);

      // Call Api.
      getAdminProjects(apiResponseTimeout);
    }

    if (participantRolChangeRequest.requested) {
      changeParticipantRol();
    }

    if (removeParticipantRequest.requested) {
      removeParticipantFromProject();
    }

    if (saveProjectRequest.requested) {
      saveProject();
    }

    if (deleteProjectRequest.requested) {
      deleteProject();
    }
  }, [[], removeParticipantRequest, participantRolChangeRequest, saveProjectRequest, deleteProjectRequest])

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-grow">
      <Card className="w-full max-w-xl m-4">
        <CardHeader>
          <CardTitle>Proyectos</CardTitle>
          <CardDescription>
            Edita tus proyectos existentes o añade nuevos.
          </CardDescription>
        </CardHeader>
        {
          loading ?
            <BarLoader color={loadingColor} loading={loading} cssOverride={loadingCSSOverride} size={150} aria-label="Loading Spinner" data-testid="loader" />
            : <Formik
              initialValues={projects.list}
              validationSchema={Yup.object({
                projects: Yup.array().of(projectValidation),
              })}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, isSubmitting, setFieldValue, handleSubmit, dirty }) => (
                <Form>
                  <CardContent>
                    <FieldArray name="projects">
                      {({ push, remove }) => (
                        <>
                          <Accordion type="single" className="w-full" collapsible>
                            {
                              values.map((project, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                  <AccordionTrigger className="text-left">
                                    {project.titulo || `Proyecto ${index + 1}`}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-4">
                                      <FormField
                                        label="Título"
                                        name={`${index}.titulo`}
                                      />
                                      <FormField
                                        label="Descripción"
                                        name={`${index}.descripcion`}
                                        value={project.descripcion}
                                        as={Textarea}
                                      />
                                      <FormField
                                        label="URL de repositorio"
                                        name={`${index}.url_repository`}
                                        value={project.url_repository}
                                        onChange={(e) => {
                                          project.url_repository = e.target.value;
                                          setFieldValue(`${index}.url_repository`, e.target.value)
                                        }}
                                      />
                                      <FormField
                                        label="URL de la página"
                                        name={`${index}.url_deploy`}
                                        value={project.url_deploy}
                                        onChange={(e) => {
                                          project.url_deploy = e.target.value;
                                          setFieldValue(`${index}.url_deploy`, e.target.value)
                                        }}
                                      />
                                      <SelectField
                                        label="Tecnologías usadas"
                                        name={`${index}.tecnologias`}
                                        options={technologyOptions}
                                        setFieldValue={setFieldValue}
                                        values={values[index]}
                                      />
                                      <div>
                                        <Label htmlFor={`${index}.estado`}>
                                          Estado
                                        </Label>
                                        <Select
                                          onValueChange={(value) =>
                                            setFieldValue(
                                              `${index}.estado`,
                                              value
                                            )
                                          }
                                          defaultValue={project.estado}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona el estado" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="nuevo">
                                                Nuevo
                                              </SelectItem>
                                              <SelectItem value="en_desarrollo">
                                                En desarrollo
                                              </SelectItem>
                                              <SelectItem value="finalizado">
                                                Finalizado
                                              </SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                          name={`${index}.estado`}
                                          component="p"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor={`${index}.permite_sumarse`}>
                                          Abierto
                                        </Label>
                                        <Select
                                          onValueChange={(value) =>
                                            setFieldValue(
                                              `${index}.permite_sumarse`,
                                              value
                                            )
                                          }
                                          defaultValue={project.permite_sumarse}
                                        >
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="¿Está abierto a nuevos integrantes?" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectItem value="true">Sí</SelectItem>
                                              <SelectItem value="false">No</SelectItem>
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                        <ErrorMessage
                                          name={`${index}.permite_sumarse`}
                                          component="p"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor={`${index}.participantes`}
                                        >
                                          Participantes
                                        </Label>
                                      </div>
                                      <div className="space-y-2">
                                        {project.participantes.map(
                                          (participant, pIndex) => {
                                            const memberData = project.participantes.find(
                                              (m) => m.nombre === participant
                                            );
                                            return (
                                              <div
                                                key={pIndex}
                                                className="flex items-center justify-between bg-gray-100 p-2 rounded"
                                              >
                                                <div className="flex items-center space-x-2">
                                                  <Avatar>
                                                    <AvatarImage
                                                      src={participant.image}
                                                      alt={participant}
                                                    />
                                                    <AvatarFallback>
                                                      {participant[0]}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                  <span>{participant.nombre + " " + participant.apellido}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                      handleAdminButton(project, participant)
                                                    }}
                                                  >
                                                    <Shield className="h-4 w-4" />
                                                  </Button>
                                                  <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                      const newParticipants =
                                                        project.participantes.filter(
                                                          (p) => p !== participant
                                                        );
                                                      setFieldValue(
                                                        `${index}.participantes`,
                                                        newParticipants
                                                      );
                                                      handleRemoveParticipantButton(project, participant);
                                                    }}
                                                  >
                                                    <X className="h-4 w-4" />
                                                  </Button>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>

                                      <div className="flex space-x-2 mt-4">
                                        <Button
                                          type="button"
                                          variant="link"
                                          disabled={isSubmitting || !dirty}
                                          onClick={() => {
                                            handleSaveProjectButton(project);
                                            handleSubmit();
                                          }}
                                        >
                                          <Save className="mr-2 h-4 w-4" />
                                          Guardar
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="link"
                                          className="text-red-600"
                                          onClick={() => {
                                            remove(index)
                                            handleDeleteProjectButton(project)
                                          }}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Eliminar Proyecto
                                        </Button>
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                          </Accordion>
                          <AddProjectModal
                            tokenSesion={tokenSesion}
                            onAddProject={handleAddProject}
                            technologyOptions={technologyOptions}
                            isOpen={isAddModalOpen}
                            setIsOpen={setIsAddModalOpen}
                          />
                        </>
                      )}
                    </FieldArray>
                  </CardContent>
                </Form>
              )}
            </Formik>
        }
      </Card>
    </div>
  );
};

const FormField = ({ label, name, as = Input, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field
      as={as}
      id={name}
      name={name}
      className="w-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      {...props}
    />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);

const SelectField = ({ label, name, options, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <ReactSelect
      isMulti
      name={name}
      options={options}
      className="w-full"
      classNamePrefix="react-select"
      value={options.filter((option) =>
        props.values[name.split(".").pop()]?.includes(option.value)
      )}
      onChange={(selectedOptions) =>
        props.setFieldValue(
          name,
          selectedOptions.map((option) => option.value)
        )
      }
    />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);
