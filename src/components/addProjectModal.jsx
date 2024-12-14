import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { projectValidation } from "@/validationSchema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import ReactSelect from "react-select";
import { BarLoader } from "react-spinners";
import ProyectosController from "@/services/dbService/proyectos/proyectosController";

const newProjectInitialValues = {
  titulo: "",
  descripcion: "",
  url_proyecto: "",
  url_pagina: "",
  tecnologias: [],
  estado: "nuevo",
  permite_sumarse: true
};

export const AddProjectModal = function ({tokenSesion, onAddProject,technologyOptions,isOpen,setIsOpen}){
  const crearProyectoTimeOut = 100000;
  const loadingCSSOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(false);
  const [loadingColor, setLoadingColor] = useState( "#9333ea")
  const [requestCrearProyecto, setRequestCrearProyecto] = useState({
    state: false,
    data: {},
  });

  useEffect(()=>{
    async function crearProyecto(apiResponseTimeout) {
      try {
        const resultado = await ProyectosController.asyncCrearProyecto(tokenSesion,requestCrearProyecto.data.proyecto);
        if (resultado.exitoso) {
          alert("Proyecto creado exitosamente.");
          onAddProject(requestCrearProyecto.data.proyecto);
          setIsOpen(false);
        }
        else {
          alert("Error:"+resultado.detalle);
          console.log("Error:"+resultado.detalle);
        }
      }
      catch (e) {
        alert("Error:"+e);
        console.log(e);
      }
      finally{
        // Reset Request
        setLoading(false);
        clearTimeout(apiResponseTimeout)
        setRequestCrearProyecto({
          state: false,
          data: {}
        })

      }

    }

    if(requestCrearProyecto.state === true){
      // Start Loading Bar & Timer
      setLoading(true)
      const apiResponseTimeout = setTimeout(() => {
        alert("Error: Timeout Crear Proyecto!")
        setLoading(false)
      }, crearProyectoTimeOut);

      // Call Api.
      crearProyecto(apiResponseTimeout);
    }

  },[requestCrearProyecto])

  const handleSubmit = (newProject, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    resetForm();
    setRequestCrearProyecto({
      state: true,
      data: {
        proyecto: newProject,
        setSubmitting: setSubmitting,
        resetForm: resetForm
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4" onClick={() => setIsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Nuevo Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Proyecto</DialogTitle>
          <DialogDescription>
            Completa los detalles del nuevo proyecto.
          </DialogDescription>
        </DialogHeader>
        { 
          loading?
            <BarLoader color={loadingColor} loading={loading} cssOverride={loadingCSSOverride} size={150} aria-label="Loading Spinner" data-testid="loader"/>
          : <></>
        }
        <Formik
          initialValues={newProjectInitialValues}
          validationSchema={projectValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <FormField label="Título" name="titulo" />
              <FormField label="Descripción" name="descripcion" as={Textarea} />
              <FormField label="URL de repositorio" name="url_proyecto" />
              <FormField label="URL de la página" name="url_pagina" />
              <FormCheckbox label="¿Está abierto a nuevos integrantes?" name="permite_sumarse"/>
              <SelectField
                label="Tecnologías usadas"
                name="tecnologias"
                options={technologyOptions}
                setFieldValue={setFieldValue}
              />
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select
                  onValueChange={(value) => setFieldValue("estado", value)}
                  defaultValue="nuevo"
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
                </Select>
                <ErrorMessage
                  name="estado"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="mx-auto"
                  disabled={isSubmitting}
                >
                  Añadir Proyecto
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
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

const FormCheckbox = ({ label, name, as = Input, ...props }) => (
  <div>
    <Label htmlFor={name} 
    style={{
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'left',
    }}>
      {label}
      <Field
        type="checkbox"
        as={as}
        id={name}
        name={name}
        className="w-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          'margin-left': '10%',
          width: '5%',
        }}
        {...props}
      />
    </Label>
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);

const SelectField = ({ label, name, options, setFieldValue }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <ReactSelect
      isMulti
      name={name}
      options={options}
      className="w-full"
      classNamePrefix="react-select"
      onChange={(selectedOptions) =>
        setFieldValue(
          name,
          selectedOptions.map((option) => option.value)
        )
      }
    />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);
