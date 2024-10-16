"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { projectValidation } from "@/validationSchema";
import { AddProjectModal } from "../components/addProjectModal";
import { Save, Trash2 } from "lucide-react";
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
import proyectosJson from "../../assets/proyectos.json";
import aptitudesJson from "../../assets/aptitudes.json";
import ReactSelect from "react-select";
import * as Yup from "yup";

export const EditProjects = () => {
  const [projects, setProjects] = useState(proyectosJson.proyectos);
  const { technologyOptions } = aptitudesJson;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setProjects(values.projects);
    setSubmitting(false);
    console.log(JSON.stringify(values, null, 2));
  };

  const initialValues = {
    projects: projects,
  };

  const handleAddProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-grow">
      <Card className="w-full max-w-xl m-4">
        <CardHeader>
          <CardTitle>Proyectos</CardTitle>
          <CardDescription>
            Edita tus proyectos existentes o añade nuevos.
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
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
                        {values.projects.map((project, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left">
                              {project.titulo || `Proyecto ${index + 1}`}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <FormField
                                  label="Título"
                                  name={`projects.${index}.titulo`}
                                />
                                <FormField
                                  label="Descripción"
                                  name={`projects.${index}.descripcion`}
                                  as={Textarea}
                                />
                                <FormField
                                  label="URL de repositorio"
                                  name={`projects.${index}.url_proyecto`}
                                />
                                <FormField
                                  label="URL de la página"
                                  name={`projects.${index}.url_pagina`}
                                />
                                <SelectField
                                  label="Tecnologías usadas"
                                  name={`projects.${index}.tecnologías`}
                                  options={technologyOptions}
                                  setFieldValue={setFieldValue}
                                  values={values.projects[index]}
                                />
                                <div>
                                  <Label htmlFor={`projects.${index}.estado`}>
                                    Estado
                                  </Label>
                                  <Select
                                    onValueChange={(value) =>
                                      setFieldValue(
                                        `projects.${index}.estado`,
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
                                    name={`projects.${index}.estado`}
                                    component="p"
                                    className="text-red-500 text-sm"
                                  />
                                </div>
                                <div className="flex space-x-2 mt-4">
                                  <Button
                                    type="button"
                                    variant="link"
                                    disabled={isSubmitting || !dirty}
                                    onClick={() => {
                                      console.log(
                                        JSON.stringify(project, null, 2)
                                      );
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
                                    onClick={() => remove(index)}
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
