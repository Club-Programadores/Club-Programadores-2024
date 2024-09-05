import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { technologyOptions } from "../FiltersDropdown/TechnologyDropdown";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import proyectosJson from "../../../assets/proyectos.json";
import { projectValidationSchema } from "@/validationSchema";

export const EditProjects = () => {
  const projects = JSON.parse(JSON.stringify(proyectosJson)).proyectos;
  const currentProject = projects.find((project) => project.id === 1);
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  const initialTechnologyValues = technologyOptions.filter((option) =>
    currentProject.tecnologías.some(
      (tech) => normalizeString(tech) === normalizeString(option.value)
    )
  );

  const handleSubmit = (values) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
    }, 400);
  };

  return (
    <Card>
      <Formik
        initialValues={{
          titulo: currentProject.titulo,
          descripcion: currentProject.descripcion,
          url_proyecto: currentProject.url_proyecto,
          url_pagina: currentProject.url_pagina,
          estado: currentProject.estado,
          tecnologías: currentProject.tecnologías,
        }}
        validationSchema={projectValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <>
            <CardHeader>
              <CardTitle>Proyectos</CardTitle>
              <CardDescription>
                Edita tus proyectos o añade uno nuevo.
              </CardDescription>
            </CardHeader>
            <Form>
              <CardContent className="space-y-2">
                <div>
                  <h3 className="pt-2 text-lg font-semibold">
                    Proyecto actual
                  </h3>

                  <Label htmlFor="titulo">Título</Label>
                  <Field
                    as={Input}
                    type="text"
                    id="titulo"
                    name="titulo"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="titulo"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Field
                    as={Textarea}
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="url_proyecto">URL de repositorio</Label>
                  <Field
                    as={Input}
                    type="text"
                    id="url_proyecto"
                    name="url_proyecto"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="url_proyecto"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="url_pagina">URL de la página</Label>
                  <Field
                    as={Input}
                    type="text"
                    id="url_pagina"
                    name="url_pagina"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="url_pagina"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="technology">Tecnologías</Label>
                  <Select
                    isMulti
                    name="technology"
                    options={technologyOptions}
                    className="w-full"
                    value={initialTechnologyValues}
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        "tecnologías",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  />
                  <ErrorMessage
                    name="technology"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Field
                    as={ShadSelect}
                    id="estado"
                    name="estado"
                    className="w-full"
                  />
                  <ShadSelect
                    onValueChange={(value) => setFieldValue("estado", value)}
                    defaultValue={currentProject.estado}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="en_desarrollo">
                          En desarrollo
                        </SelectItem>
                        <SelectItem value="finalizado">Finalizado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </ShadSelect>
                </div>
              </CardContent>
              <CardFooter className="mt-0">
                <Button type="submit" disabled={isSubmitting}>
                  Guardar
                </Button>
              </CardFooter>
            </Form>
          </>
        )}
      </Formik>
    </Card>
  );
};
