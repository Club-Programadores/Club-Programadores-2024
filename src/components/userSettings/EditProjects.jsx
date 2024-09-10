import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { projectValidation } from "@/validationSchema";
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
  CardFooter,
} from "@/components/ui/card";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Select from "react-select";
import proyectosJson from "../../../assets/proyectos.json";
import aptitudesJson from "../../../assets/aptitudes.json";

export const EditProjects = () => {
  const projects = proyectosJson.proyectos;
  const currentProject = projects.find((project) => project.id === 1); // <- Cambiar id para probar editar cualquier proyecto
  const { technologyOptions } = aptitudesJson;

  const initialValues = {
    titulo: currentProject.titulo,
    descripcion: currentProject.descripcion,
    url_proyecto: currentProject.url_proyecto,
    url_pagina: currentProject.url_pagina,
    estado: currentProject.estado,
    tecnologías: currentProject.tecnologías.map((tech) => tech.toLowerCase()),
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={projectValidation}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <CardHeader>
              <CardTitle>Proyectos</CardTitle>
              <CardDescription>
                Edita tus proyectos o añade uno nuevo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="pt-2 text-lg font-semibold">Proyecto actual</h3>
              <FormField label="Título" name="titulo" />
              <FormField label="Descripción" name="descripcion" as={Textarea} />
              <FormField label="URL de repositorio" name="url_proyecto" />
              <FormField label="URL de la página" name="url_pagina" />
              <SelectField
                label="Tecnologías"
                name="tecnologías"
                options={technologyOptions}
                setFieldValue={setFieldValue}
                values={values}
              />
              <div>
                <Label htmlFor="estado">Estado</Label>
                <ShadSelect
                  onValueChange={(value) => setFieldValue("estado", value)}
                  defaultValue={currentProject.estado}
                >
                  <SelectTrigger className="w-full">
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
                <ErrorMessage
                  name="estado"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="mt-0">
              <Button type="submit" disabled={isSubmitting}>
                Guardar
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

const FormField = ({ label, name, as = Input, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field as={as} id={name} name={name} className="w-full" {...props} />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);

const SelectField = ({ label, name, options, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Select
      isMulti
      name={name}
      options={options}
      className="w-full"
      value={options.filter((option) =>
        props.values[name].includes(option.value)
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
