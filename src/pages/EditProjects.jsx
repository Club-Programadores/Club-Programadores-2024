import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { projectValidation } from "@/validationSchema";
import { AddProjectModal } from "../components/addProjectModal";
import { Save, Trash2, UserPlus, Shield, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import aptitudesJson from "../../assets/aptitudes.json";
import ReactSelect from "react-select";
import * as Yup from "yup";
import { BarLoader } from "react-spinners";
import ProyectosController from "@/services/dbService/proyectos/proyectosController";

export const EditProjects = ({ tokenSesion, user }) => {
  const { technologyOptions } = aptitudesJson;
  const cargarProyectosTimeOut = 100000;
  const loadingCSSOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(true);
  const [loadingColor, setLoadingColor] = useState("#9333ea")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState({
    fetched: false,
    lista: []
  });

  const [requestSacarParticipante, setRequestSacarParticipante] = useState({
    requested: false,
    proyecto_id: -1,
    participante_id: -1
  });
  const [requestCambioRolParticipante, setRequestCambioRolParticipante] = useState({
    requested: false,
    proyecto_id: -1,
    participante_id: -1,
    changeToAdmin: false
  });
  const [requestGuardarProyecto, setRequestGuardarProyecto] = useState({
    requested: false,
    proyecto: null
  });
  const [requestEliminarProyecto, setRequestEliminarProyecto] = useState({
    requested: false,
    proyecto_id: -1
  });


  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  const handleAddProject = (newProject) => {
    location.reload(); //Recargar pagina para que se muestre el nuevo proyecto
    setIsAddModalOpen(false);
  };


  const handleSacarParticipanteButton = (proyecto, participante) => {
    setRequestSacarParticipante({
      requested: true,
      proyecto_id: proyecto.id,
      participante_id: participante.id
    });
  };

  const handleAdminButton = (proyecto, participante) => {
    setRequestCambioRolParticipante({
      requested: true,
      proyecto_id: proyecto.id,
      participante_id: participante.id,
      changeToAdmin: participante.admin == 0 ? true : false
    });
  };


  const handleGuardarProyectoButton = (proyecto) => {
    setRequestGuardarProyecto({
      requested: true,
      proyecto: proyecto
    });
  };

  const handleEliminarProyectoButton = (proyecto) => {
    setRequestEliminarProyecto({
      requested: true,
      proyecto_id: proyecto.id
    });
  };


  useEffect(() => {
    async function getProyectosAdministrador(apiResponseTimeout) {
      let proyectos = [];
      try {
        const resultado = await ProyectosController.asyncObtenerProyectosAdministrador(tokenSesion);
        if (resultado.exitoso) {
          proyectos = resultado.datos.proyectos;
        }
        else {
          console.log(resultado.detalle)
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        // Reset Request
        setLoading(false);
        clearTimeout(apiResponseTimeout)
        setProyectos({
          fetched: true,
          lista: proyectos
        });
      }
    }

    async function sacarParticipante() {
      try {
        const resultado = await ProyectosController.asyncBorrarParticipanteProyecto(tokenSesion, requestSacarParticipante.proyecto_id, requestSacarParticipante.participante_id);
        if (resultado.exitoso) {
          console.log("Usuario echado exitosamente.")
        }
        else {
          console.log(resultado.detalle)
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        setRequestSacarParticipante({
          requested: false,
          proyecto_id: -1,
          participante_id: -1
        });
      }
    }

    async function cambiarRolParticipante() {
      try {
        //Hacer admin participante.
        if (requestCambioRolParticipante.changeToAdmin) {
          const resultado = await ProyectosController.asyncAñadirAdministradorProyecto(tokenSesion, requestCambioRolParticipante.proyecto_id, requestCambioRolParticipante.participante_id);
          if (resultado.exitoso) {
            console.log(`Usuario ${requestCambioRolParticipante.participante_id} es ahora admin en ${requestCambioRolParticipante.proyecto_id}`)
          }
          else {
            console.log(resultado.detalle)
          }
        }
        //Sacar admin participante.
        else {
          const resultado = await ProyectosController.asyncBorrarAdministradorProyecto(tokenSesion, requestCambioRolParticipante.proyecto_id, requestCambioRolParticipante.participante_id);
          if (resultado.exitoso) {
            console.log(`Usuario ${requestCambioRolParticipante.participante_id} ya no es admin en ${requestCambioRolParticipante.proyecto_id}`)
          }
          else {
            console.log(resultado.detalle)
          }
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        //cambiar rol del participante en front.
        setProyectos({
          fetched: true,
          lista: proyectos.lista.map(proyecto => {
            if (proyecto.id == requestCambioRolParticipante.proyecto_id) {
              const indexParticipante = proyecto.participantes.findIndex(participante => participante.id == requestCambioRolParticipante.participante_id);
              const isAdmin = proyecto.participantes[indexParticipante].admin;
              proyecto.participantes[indexParticipante].admin = !isAdmin;
            }
            return proyecto;
          })
        })
        //reiniciar solicitud cambio rol.
        setRequestCambioRolParticipante({
          requested: false,
          proyecto_id: -1,
          participante_id: -1,
          changeToAdmin: false
        });
      }
    }

    async function guardarProyecto() {
      try {
        const resultado = await ProyectosController.asyncActualizarProyecto(tokenSesion, requestGuardarProyecto.proyecto);
        if (resultado.exitoso) {
          alert("Proyecto actualizado exitosamente.")
        }
        else {
          alert(resultado.detalle)
          console.log(resultado.detalle)
        }
      }
      catch (e) {
        alert(e)
        console.log(e)
      }
      finally {
        setRequestGuardarProyecto({
          requested: false,
          proyecto: null
        })
      }
    }

    async function eliminarProyecto() {
      try {
        const resultado = await ProyectosController.asyncBorrarProyecto(tokenSesion, requestEliminarProyecto.proyecto_id);
        if (resultado.exitoso) {
          alert("Proyecto borrado exitosamente.")
          setProyectos({
            fetched: true,
            lista: proyectos.lista.filter(x => x.id == requestEliminarProyecto.proyecto_id)
          })
        }
        else {
          alert(resultado.detalle)
          console.log(resultado.detalle)
        }
      }
      catch (e) {
        alert(e)
        console.log(e)
      }
      finally {
        setRequestEliminarProyecto({
          requested: false,
          proyecto_id: -1
        });
        location.reload(); //Recargar pagina para que se regleje bien la lista de proyectos
      }
    }

    if (!proyectos.fetched) {
      // Start Loading Bar
      setLoading(true)
      const apiResponseTimeout = setTimeout(() => {
        alert("Error: Timeout Crear Proyecto!")
        setLoading(false)
      }, cargarProyectosTimeOut);

      // Call Api.
      getProyectosAdministrador(apiResponseTimeout);
    }

    if (requestCambioRolParticipante.requested) {
      cambiarRolParticipante();
    }

    if (requestSacarParticipante.requested) {
      sacarParticipante();
    }

    if (requestGuardarProyecto.requested) {
      guardarProyecto();
    }

    if (requestEliminarProyecto.requested) {
      eliminarProyecto();
    }
  }, [[], requestSacarParticipante, requestCambioRolParticipante, requestGuardarProyecto, requestEliminarProyecto])

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
              initialValues={proyectos.lista}
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
                                                      handleSacarParticipanteButton(project, participant);
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
                                            handleGuardarProyectoButton(project);
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
                                            handleEliminarProyectoButton(project)
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
